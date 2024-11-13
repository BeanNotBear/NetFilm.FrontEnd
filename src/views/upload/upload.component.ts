import {Component, Input} from '@angular/core';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzUploadModule, NzUploadFile} from "ng-zorro-antd/upload";
import {HttpClient, HttpRequest, HttpResponse} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {filter} from "rxjs";

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

  uploading = false;
  fileList: NzUploadFile[] = [];

  constructor(
    private http: HttpClient,
    private messageService: NzMessageService
  ) {
  }

  onRemove() {
    if (this.limitFile !== null && this.limitFile > 0) {
      const lastIndex = this.fileList.length  - 1;
      if(lastIndex > this.limitFile - 1) {
        this.fileList = this.fileList.slice(1, lastIndex+1);
      }
    }
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.uploading = true;
    // You can use any AJAX library you like
    const req = new HttpRequest('POST', 'https://www.mocky.io/v2/5cc8019d300000980a055e76', formData, {
      // reportProgress: true
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
}
