import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appContent]',
  standalone: true
})
export class ContentDirective {

  constructor(public template: TemplateRef<any>) { }

}
