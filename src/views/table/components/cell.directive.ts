import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appCell]',
  standalone: true
})
export class CellDirective {

  constructor(
    public  template: TemplateRef<any>
  ) { }

}
