import {Component} from '@angular/core';
import {NzModalModule} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dialog-admin',
  standalone: true,
  imports: [NzModalModule],
  templateUrl: './dialog-admin.component.html',
  styleUrl: './dialog-admin.component.scss'
})
export class DialogAdminComponent {
  isVisible = false;
  isOkLoading = false;

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
