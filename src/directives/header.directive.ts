import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appHeader]',
  standalone: true
})
export class HeaderDirective {

  constructor(public template: TemplateRef<any>) { }

}
