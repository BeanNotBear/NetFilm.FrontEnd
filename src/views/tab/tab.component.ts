import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import {CommentComponent} from "../comment/comment.component";

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [NzTabsModule, CommentComponent],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent {
  tabs = [1, 2];
}
