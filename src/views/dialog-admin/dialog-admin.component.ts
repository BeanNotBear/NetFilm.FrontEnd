import {Component, ContentChild, ContentChildren, Input, QueryList} from '@angular/core';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {DialogDirective} from "../../directives/dialog.directive";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-dialog-admin',
  standalone: true,
  imports: [NzModalModule, NgTemplateOutlet],
  templateUrl: './dialog-admin.component.html',
  styleUrl: './dialog-admin.component.scss'
})
export class DialogAdminComponent {
  @ContentChild(DialogDirective) dialog!: DialogDirective;

  @Input() isVisible = true;
  @Input() isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
