import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {NzUploadFile} from "ng-zorro-antd/upload";

@Injectable({
  providedIn: 'root'
})
export class SubtitleService {

  constructor(private apiService: ApiService) {
  }

  uploadSubtitle(id: string, name: string[], files: NzUploadFile[]) {
    let i = 0;
    files.forEach(x => {
      let formData = new FormData();
      if (x instanceof File) {
        formData.append('File', x);
        formData.append('SubtitleName', name[i]);
        formData.append('MovieId', id);
      }
      ++i;
      this.apiService.uploadSubtitle(id, formData, 'POST').subscribe({
        next: data => {

        }, error: err => {
          console.error(err);
        }
      });
    })
  }
}
