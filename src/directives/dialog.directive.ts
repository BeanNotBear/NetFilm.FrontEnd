import {ContentChild, Directive, EventEmitter, Input, Output} from '@angular/core';
import {DialogTitleDirective} from "./dialog-title.directive";
import {DialogContentDirective} from "./dialog-content.directive";
import {Dialog} from "@angular/cdk/dialog";

@Directive({
  selector: 'ngvn-dialog',
  standalone: true
})
export class DialogDirective {
  @Input() dialogName = '';
  @Input() key = '';
  @ContentChild(DialogTitleDirective, {static: true}) templateHeader!: DialogTitleDirective;
  @ContentChild(DialogContentDirective, {static: true}) templateContent!: DialogContentDirective;
  @Output() onSubmit = new EventEmitter();
  constructor() {
  }

}
