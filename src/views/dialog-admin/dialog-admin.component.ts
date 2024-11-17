import {
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';
import {ModalButtonOptions, NzModalModule} from 'ng-zorro-antd/modal';
import {DialogDirective} from "../../directives/dialog.directive";
import {NgTemplateOutlet} from "@angular/common";
import {NzSafeAny} from "ng-zorro-antd/core/types";

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
  @Input() width: number |  string = 600;
  @Input() footer: string | TemplateRef<{}> | Array<ModalButtonOptions<NzSafeAny>> | null | undefined = Array<ModalButtonOptions<NzSafeAny>>();
  @Input() dialogTitle = "Modal Title";

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
      this.close.emit();
      this.submit.emit()
    }, 3000);

  }

  handleCancel(): void {
    this.isVisible = false;
    this.close.emit();
  }
}
