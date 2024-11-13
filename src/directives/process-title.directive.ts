import {ContentChild, Directive, Input} from '@angular/core';
import {ProcessContentDirective} from "./process-content.directive";

@Directive({
  selector: '[appProcessTitle]',
  standalone: true
})
export class ProcessTitleDirective {

  @Input() tabName = '';
  @Input() key = '';
  @ContentChild(ProcessTitleDirective, {static: true}) templateHeader?: ProcessTitleDirective;
  @ContentChild(ProcessContentDirective, {static: true}) templateContent?: ProcessContentDirective;

  constructor() {
  }

}
