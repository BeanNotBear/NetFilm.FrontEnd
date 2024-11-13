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
  ],
  templateUrl: './movie-admin.component.html',
  styleUrl: './movie-admin.component.scss'
})
export class MovieAdminComponent {
  alowUploadFileTypes = 'video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo,video/x-flv,video/3gpp,video/x-matroska';
}
