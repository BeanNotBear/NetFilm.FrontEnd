import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MovieResponseDto} from "../../models/movieDtos/movie.response.dto";
import {HttpClient, HttpRequest, HttpResponse} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {delay, filter} from "rxjs";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import {FormsModule} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {SubtitleService} from "../../service/subtitle.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-subtitle',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzUploadModule, FormsModule, NzInputDirective],
  templateUrl: './update-subtitle.component.html',
  styleUrl: './update-subtitle.component.scss'
})
export class UpdateSubtitleComponent {
  @Input() movie!: MovieResponseDto;
  @Output() raiseMovieId = new EventEmitter<string>();
  uploading = false;
  fileList: NzUploadFile[] = [];
  subtitleNameList: string[] = [];

  constructor(
    private http: HttpClient,
    private messageService: NzMessageService,
    private subtitleService: SubtitleService
  ) {}

  beforeUpload = (file: NzUploadFile): boolean => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension !== 'vtt') {
      this.messageService.error('Can only upload .vtt files!');
      return false;
    }

    this.fileList = this.fileList.concat(file);
    return false; // Prevents the default upload behavior.
  };


  async handleUpload() {
    const response = await this.subtitleService.uploadSubtitle(
      this.movie.id,
      this.subtitleNameList,
      this.fileList
    );
    this.messageService.success('Add movie successfully!');
    this.raiseMovieId.emit(this.movie.id);
    this.fileList = [];
    this.subtitleNameList = [];
  }

  onOpen(subtitleUrl: string) {
    // Create an anchor element
    const anchor = document.createElement('a');

    // Set the href to the subtitle URL
    anchor.href = subtitleUrl;

    // Set the target to open the link in a new tab
    anchor.target = '_blank';

    // Append the anchor to the document
    document.body.appendChild(anchor);

    // Trigger the opening of the link
    anchor.click();

    // Remove the anchor after the action
    document.body.removeChild(anchor);
  }

  onDelete(id: string) {
    Swal.fire({
      title: "Do you want to delete this?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`
    }).then((result) => {
      if (result.isConfirmed) {
        this.subtitleService.deleteSubtitle(id).subscribe({
          next: value => {
            console.log(value)
            this.raiseMovieId.emit(this.movie.id);
            Swal.fire("Delete successfully", "", "success");
          },
          error: err => {
            console.error(err)
            Swal.fire("Changes are not saved", "", "info");
          }
        });

      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

  }
}
