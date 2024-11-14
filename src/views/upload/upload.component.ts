import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzUploadModule, NzUploadFile} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {MovieService} from "../../service/movie.service";
import {MovieResponseDto} from "../../models/movieDtos/movie.response.dto";

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
      }
    }
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    this.uploading = true;
    // You can use any AJAX library you like
    this.movieService.uploadMovie(this.fileList[0])
      .subscribe({
        next: (movie) => {
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
}
