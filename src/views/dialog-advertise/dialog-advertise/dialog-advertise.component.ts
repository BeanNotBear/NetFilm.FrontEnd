import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdvertiseDto } from '../../../models/advertiseDtos/advertiseDto.model';
import { ApiService } from '../../../api/api.service';

@Component({
  selector: 'app-dialog-advertise',
  standalone: true,
  imports: [],
  templateUrl: './dialog-advertise.component.html',
  styleUrl: './dialog-advertise.component.scss',
})
export class DialogAdvertiseComponent {
  @Input() idOpenAdvertise = false;
  @Input() advertise!: AdvertiseDto;
  @Output() closeDialog = new EventEmitter<boolean>();
  allowHalf = true;

  constructor(private apiService: ApiService) {}

  onClose() {
    this.idOpenAdvertise = false;
    this.closeDialog.emit(this.idOpenAdvertise);
  }
}
