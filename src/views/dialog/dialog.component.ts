import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RateComponent} from "../rate/rate.component";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    RateComponent
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() isOpen = false;
  @Output() closeDialog = new EventEmitter<boolean>();
  rate = 4.1;
  allowHalf = true

  onClose() {
    this.isOpen = false;
    this.closeDialog.emit(this.isOpen);
  }
}
