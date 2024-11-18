import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzUploadModule, NzUploadFile} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {MovieService} from "../../service/movie.service";
import {MovieResponseDto} from "../../models/movieDtos/movie.response.dto";
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    NzButtonModule,
    NzIconDirective,
    NzUploadModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  @Input() fileType!: string;
  @Input() multipleUpload = true;
  @Input() limitFile: number | null = null;
  @Output() onUploadMovieDone = new EventEmitter<MovieResponseDto>();
  @Output() raiseNumberOfFile = new EventEmitter<number>();

  uploading = false;
  fileList: NzUploadFile[] = [];

  constructor(
    private movieService: MovieService,
    private messageService: NzMessageService
  ) {
  }

  onRemove() {
    if (this.limitFile !== null && this.limitFile > 0) {
      const lastIndex = this.fileList.length - 1;
      if (lastIndex > this.limitFile - 1) {
        this.fileList = this.fileList.slice(1, lastIndex + 1);
        this.messageService.error(`Only ${this.limitFile} file${this.limitFile !== 1 ? 's' : ''} allowed`);
      }
    }
    if(this.fileList) {
      this.raiseNumberOfFile.emit(this.fileList.length);
    }
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    this.uploading = true;
    this.movieService.uploadMovie(this.fileList[0])
      .subscribe({
        next: (movie) => {
          if(this.fileList[0] instanceof File) {
            const duration = this.getDuration(this.fileList[0]);
            duration.then(duration => movie.duration = Math.ceil(duration/60));
          }
          this.uploading = false;
          this.fileList = [];
          this.messageService.success('upload successfully.');
          this.onUploadMovieDone.emit(movie);
        },
        error: () => {
          this.uploading = false;
          this.messageService.error('upload failed.');
        }
      });
  }

  private getDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      // Create temporary video element
      const video = document.createElement('video');
      video.preload = 'metadata';

      // Create object URL for the file
      const url = URL.createObjectURL(file);

      video.onloadedmetadata = () => {
        // Clean up object URL
        URL.revokeObjectURL(url);
        resolve(video.duration);
      };

      video.onerror = () => {
        URL.revokeObjectURL(url);
        reject("Error loading video file");
      };

      video.src = url;
    });
  }
}
