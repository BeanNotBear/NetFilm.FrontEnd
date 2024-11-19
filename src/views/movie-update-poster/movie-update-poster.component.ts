import {Component, Input} from '@angular/core';
import {Observable, Observer} from 'rxjs';

import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadFile, NzUploadModule} from 'ng-zorro-antd/upload';
import {MovieResponseDto} from "../../models/movieDtos/movie.response.dto";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {ApiService} from "../../api/api.service";

@Component({
  selector: 'app-movie-update-poster',
  standalone: true,
  imports: [NzIconModule, NzUploadModule, NzTooltipDirective],
  templateUrl: './movie-update-poster.component.html',
  styleUrl: './movie-update-poster.component.scss'
})
export class MovieUpdatePosterComponent {
  loading = false;
  avatarUrl?: string;
  @Input() movie!: MovieResponseDto;

  constructor(private apiService: ApiService, private messageService: NzMessageService) {
  }

  api = () => {
    const api = `https://localhost:7027/api/Movies/${this.movie.id}/update/poster`;
    return api;
  }

  headers = () => {
    const headers = {'Authorization': `Bearer ${localStorage.getItem("token")}`};
    return new Headers(headers);
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const imageMimeTypes: string[] = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/tiff",
        "image/webp",
        "image/svg+xml",
        "image/x-icon"
      ];
      const isJpgOrPng = imageMimeTypes.includes(file.type!);
      if (!isJpgOrPng) {
        this.messageService.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.messageService.error('Image must smaller than 20MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    this.getBase64(info.file!.originFileObj!, (img: string) => {
      this.loading = false;
      this.avatarUrl = img;
    });
  }
}
