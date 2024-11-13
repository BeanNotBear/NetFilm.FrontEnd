import {Component, ContentChildren, QueryList} from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import {CommentComponent} from "../comment/comment.component";
import {TabDirective} from "../../directives/tab.directive";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [NzTabsModule, CommentComponent, NgTemplateOutlet],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent {
  @ContentChildren(TabDirective) tabs!: QueryList<TabDirective>;
}
