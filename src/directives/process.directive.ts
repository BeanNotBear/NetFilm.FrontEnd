import {ContentChild, Directive, Input, TemplateRef} from '@angular/core';
import {ProcessContentDirective} from "./process-content.directive";
import {ProcessTitleDirective} from "./process-title.directive";

@Directive({
  selector: 'ngvn-process',
  standalone: true
})
export class ProcessDirective {

  @Input() stepName = '';
  @Input() key = '';
  @Input() currentStep = 0;
  @ContentChild(ProcessTitleDirective, {static: true}) templateHeader?: ProcessTitleDirective;
  @ContentChild(ProcessContentDirective, {static: true}) templateContent?: ProcessContentDirective;
  constructor() { }

}
