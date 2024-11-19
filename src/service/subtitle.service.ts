import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {NzUploadFile} from "ng-zorro-antd/upload";

@Injectable({
  providedIn: 'root'
})
export class SubtitleService {

  constructor(private apiService: ApiService) {
  }

  deleteSubtitle(id: string) {
    return this.apiService.deleteSubtitle(id);
  }

  async uploadSubtitle(id: string, names: string[], files: NzUploadFile[]): Promise<void> {
    try {
      // Create an array of upload promises
      const uploadPromises = files.map((file, index) => {
        // Skip if file is not a File instance
        if (!(file instanceof File)) {
          console.warn(`File at index ${index} is not a File instance`);
          return Promise.resolve();
        }

        const formData = new FormData();
        formData.append('File', file);
        formData.append('SubtitleName', names[index]);
        formData.append('MovieId', id);

        // Convert the observable to a promise
        return new Promise<void>((resolve, reject) => {
          this.apiService.uploadSubtitle(id, formData, 'POST').subscribe({
            next: () => resolve(),
            error: (err) => {
              console.error(`Failed to upload subtitle ${names[index]}:`, err);
              reject(err);
            }
          });
        });
      });

      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error during subtitle upload:', error);
      throw error; // Re-throw to allow caller to handle the error
    }
  }
}
