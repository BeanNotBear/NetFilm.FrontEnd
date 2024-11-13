import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ngvn-process',
  standalone: true
})
export class ProcessDirective {

  constructor(public template: TemplateRef<any>) { }

}
