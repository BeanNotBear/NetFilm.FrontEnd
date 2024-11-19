import {Component, Input} from '@angular/core';
import {MovieResponseDto} from "../../models/movieDtos/movie.response.dto";
import {filter} from 'rxjs/operators';

import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadChangeParam, NzUploadFile, NzUploadModule} from 'ng-zorro-antd/upload';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";

@Component({
  selector: 'app-upload-movie',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzUploadModule, FormsModule, NzInputDirective],
  templateUrl: './upload-movie.component.html',
  styleUrl: './upload-movie.component.scss'
})
export class UploadMovieComponent {
  @Input() movie!: MovieResponseDto;

  uploading = false;
  fileList: NzUploadFile[] = [];
  fileType: string = 'video/mp4';

  constructor(
    private http: HttpClient,
    private messageService: NzMessageService
  ) {
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  async handleUpload(): Promise<void> {
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    const min = await this.getDuration(this.fileList[0]);
    this.uploading = true;
    let headers = {'Authorization' : `Bearer ${localStorage.getItem("token")}`};
    // You can use any AJAX library you like
    const req = new HttpRequest('PUT', `https://localhost:7027/api/Movies/${this.movie.id}/upload/video`, formData, {
      headers: new HttpHeaders(headers),
      params: new HttpParams().set('duration', min)
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe({
        next: () => {
          this.uploading = false;
          this.fileList = [];
          this.messageService.success('upload successfully.');
        },
        error: () => {
          this.uploading = false;
          this.messageService.error('upload failed.');
        }
      });
  }

  getDuration(file: NzUploadFile): Promise<number> {
    return new Promise((resolve, reject) => {
      const videoElement = document.createElement('video');

      let fileURL: string = '';
      if(file instanceof File) {
        fileURL = URL.createObjectURL(file);
      }

      videoElement.src = fileURL;
      videoElement.addEventListener('loadedmetadata', () => {
        const durationInMinutes = Math.ceil(videoElement.duration / 60);
        URL.revokeObjectURL(fileURL);
        resolve(durationInMinutes);
      });

      videoElement.addEventListener('error', (error) => {
        URL.revokeObjectURL(fileURL);
        reject(error);
      });
    });
  }

  protected readonly onchange = onchange;
}
