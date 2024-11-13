import {Component, ContentChildren, EventEmitter, Input, Output, QueryList} from '@angular/core';
import {COL_DATA_TYPE, Dictionary} from "./models/types";
import {ColumnDirective} from "./components/column.directive";
import {NzTableComponent, NzThAddOnComponent} from "ng-zorro-antd/table";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {DatePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from "@angular/common";
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import {FormsModule} from "@angular/forms";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzButtonComponent, NzButtonSize} from "ng-zorro-antd/button";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NzTableComponent,
    NzDividerComponent,
    NgForOf,
    NgTemplateOutlet,
    NgIf,
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    DatePipe,
    NzThAddOnComponent,
    NzTableModule,
    NzInputModule,
    FormsModule,
    NzIconDirective,
    NzButtonComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  searchText: string = "";

  @Input() loading = false;
  @Input() rows: Dictionary[] = [];
  @Input() clientPagination = true;
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() totalRows = 0;
  @Input() pageSizeOption: number[] = [10, 20, 30, 40, 50];
  @Output() pageIndexChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() searchChange = new EventEmitter<string>();

  @ContentChildren(ColumnDirective) columns!: QueryList<ColumnDirective>;

  COL_DATA_TYPE = COL_DATA_TYPE;

  onSearchTextChange(value: string) {
    this.searchChange.emit(value);
  }
}
