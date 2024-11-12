import { Injectable } from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor(private datePipe: DatePipe) {}

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'MMM. d, yyyy') || '';
  }
}
