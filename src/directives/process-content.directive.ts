import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appProcessContent]',
  standalone: true
})
export class ProcessContentDirective {

  constructor(public template: TemplateRef<any>) { }

}
