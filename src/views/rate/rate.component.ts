import {Component, Input} from '@angular/core';
import {NzRateModule} from "ng-zorro-antd/rate";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-rate',
  standalone: true,
  imports: [
    NzRateModule,
    FormsModule
  ],
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.scss'
})
export class RateComponent {
  @Input() rate: number = 0;
  @Input() totalRate = 0;
  @Input() allowClear: boolean = true;
  @Input() disable: boolean = true;
  @Input() allowHalf: boolean = false;
}
