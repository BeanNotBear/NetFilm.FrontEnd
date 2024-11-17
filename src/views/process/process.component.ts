import {Component, ContentChildren, EventEmitter, Input, Output, QueryList} from '@angular/core';
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
  @Input() totalProcesses = 0;
  @Output() onNextProcess = new EventEmitter();
  @Output() onDone = new EventEmitter();

  current = 0;


  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
    this.onNextProcess.emit();
  }

  done(): void {
    this.onDone.emit();
  }
}
