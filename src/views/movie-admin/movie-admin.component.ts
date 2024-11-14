import {Component} from '@angular/core';
import {TabComponent} from "../tab/tab.component";
import {TabDirective} from "../../directives/tab.directive";
import {ContentDirective} from "../../directives/content.directive";
import {TableComponent} from "../table/table.component";
import {ProcessComponent} from "../process/process.component";
import {ProcessDirective} from "../../directives/process.directive";
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {UploadComponent} from "../upload/upload.component";
import {ProcessContentDirective} from "../../directives/process-content.directive";
import {DialogAdminComponent} from "../dialog-admin/dialog-admin.component";
import {DialogDirective} from "../../directives/dialog.directive";
import {DialogContentDirective} from "../../directives/dialog-content.directive";
import {FormsModule} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-movie-admin',
  standalone: true,
  imports: [
    TabComponent,
    TabDirective,
    ContentDirective,
    TableComponent,
    ProcessComponent,
    ProcessDirective,
    NzButtonComponent,
    UploadComponent,
    ProcessContentDirective,
    DialogAdminComponent,
    DialogDirective,
    DialogContentDirective,
    FormsModule,
    NzInputDirective,
    EditorComponent
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  templateUrl: './movie-admin.component.html',
  styleUrl: './movie-admin.component.scss'
})
export class MovieAdminComponent {
  alowUploadFileTypes = 'video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo,video/x-flv,video/3gpp,video/x-matroska';
  isVisibleDialog  = true;
  isVisibleLoading = false;
  value = '';
  apiKey = '0vuhsazgiv5rjydoflr0l0zbhd3khd54mgka0cgti58u6pld';
  init: EditorComponent['init'] = {
    base_url: '/tinymce', // Root for resources
    suffix: '.min',        // Suffix to use when loading resources
    menubar: true,
    automatic_uploads: true
  };
}
