import {ContentChild, Directive, Input, TemplateRef} from '@angular/core';
import {ProcessContentDirective} from "./process-content.directive";

@Directive({
  selector: '[appProcessTitle]',
  standalone: true
})
export class ProcessTitleDirective {



  constructor(public template: TemplateRef<any>) {
  }

}
