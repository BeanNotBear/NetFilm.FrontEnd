import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appDialogContent]',
  standalone: true
})
export class DialogContentDirective {

  constructor(public template: TemplateRef<any>) { }

}
