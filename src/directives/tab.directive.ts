import {ContentChild, Directive, Input} from '@angular/core';
import {HeaderDirective} from "./header.directive";
import {ContentDirective} from "./content.directive";

@Directive({
  selector: 'ngvn-tab',
  standalone: true
})
export class TabDirective {

  @Input() tabName = '';
  @Input() key = '';
  @ContentChild(HeaderDirective, {static: true}) templateHeader?: HeaderDirective;
  @ContentChild(ContentDirective, {static: true}) templateContent?: ContentDirective;
  constructor() { }

}
