import {Component, EventEmitter, Output} from '@angular/core';
import { Observable, Observer } from 'rxjs';

import {NzIconDirective, NzIconModule} from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import {NzUploadComponent, NzUploadFile, NzUploadModule} from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-poster-upload',
  standalone: true,
  imports: [
    NzUploadComponent,
    NzIconDirective
  ],
  templateUrl: './poster-upload.component.html',
  styleUrl: './poster-upload.component.scss'
})
export class PosterUploadComponent {
  loading = false;
  avatarUrl?: string;
  @Output() onUploadFilePoster = new EventEmitter<NzUploadFile>();

  constructor(private messageService: NzMessageService) {}

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
      this.onUploadFilePoster.emit(info.file!);
    });

  }
}
