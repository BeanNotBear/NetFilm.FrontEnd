import {Component, ContentChildren, QueryList} from '@angular/core';
import {ProcessDirective} from "../../directives/process.directive";
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzStepsModule} from 'ng-zorro-antd/steps';
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [NzButtonModule, NzStepsModule, NgTemplateOutlet],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss'
})
export class ProcessComponent {
  @ContentChildren(ProcessDirective) processes!: QueryList<ProcessDirective>;

  current = 0;

  index = 'First-content';

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }
}
