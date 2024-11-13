import { Component } from '@angular/core';
import {TabComponent} from "../tab/tab.component";
import {TabDirective} from "../../directives/tab.directive";
import {ContentDirective} from "../../directives/content.directive";
import {TableComponent} from "../table/table.component";
import {ProcessComponent} from "../process/process.component";

@Component({
  selector: 'app-movie-admin',
  standalone: true,
  imports: [
    TabComponent,
    TabDirective,
    ContentDirective,
    TableComponent,
    ProcessComponent
  ],
  templateUrl: './movie-admin.component.html',
  styleUrl: './movie-admin.component.scss'
})
export class MovieAdminComponent {

}
