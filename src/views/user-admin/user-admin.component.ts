import { Component } from '@angular/core';
import {COL_DATA_TYPE, SortOrder} from "../table/models/types";
import {ColumnDirective} from "../table/components/column.directive";
import {TableComponent} from "../table/table.component";
import {ApiService} from "../../api/api.service";
import {PageResult} from "../../models/common/pageResult.model";
import {UserDto} from "../../models/userDtos/userDto.model";
import {CellDirective} from "../table/components/cell.directive";
import {NzButtonComponent, NzButtonSize} from "ng-zorro-antd/button";
import {NzTableCellDirective} from "ng-zorro-antd/table";
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {HeaderDirective} from "../table/components/header.directive";
import {DialogAdminComponent} from "../dialog-admin/dialog-admin.component";
import {DialogDirective} from "../../directives/dialog.directive";
import {DialogContentDirective} from "../../directives/dialog-content.directive";
import {FormsModule} from "@angular/forms";
import {AddUserComponent} from "./add-user/add-user.component";
import {UpdateUserComponent} from "./update-user/update-user.component";

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [
    ColumnDirective,
    TableComponent,
    CellDirective,
    NzButtonComponent,
    NzTableCellDirective,
    NzDividerModule,
    HeaderDirective,
    DialogAdminComponent,
    DialogDirective,
    DialogContentDirective,
    FormsModule,
    AddUserComponent,
    UpdateUserComponent
  ],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.scss'
})
export class UserAdminComponent {

  constructor(private apiService: ApiService) {
  }

  COL_DATA_TYPE = COL_DATA_TYPE;

  loading = false;
  // isVisibleDialog = false;
  isLoandingDialod = false;
  isAddUser = false;
  isUpdateUser = false;
  updateId: string = "";

  pageIndex: number = 1;
  pageSize: number = 10;
  sort: { key: string, order: SortOrder } = {key: '', order: null};
  search: string = '';

  name?: string; // role name

  pageResult: PageResult<UserDto> = new class implements PageResult<UserDto> {
    hasNext: boolean = false;
    hasPrevious: boolean = false;
    items: UserDto[] = [];
    pageIndex: number = 0;
    pageSize: number = 0;
    totalItems: number = 0;
    totalPages: number = 0;
  }

  fetchUser(): void {
    this.loading = true;
    this.apiService.getUsersPagination(this.pageIndex, this.pageSize, this.search, this.sort.key, this.sort.order == 'ascend').subscribe({
      next: (u: PageResult<UserDto>) => {
        this.pageResult = u;
        this.loading = false;
      }
    })
  }

  ngAfterViewInit() {
    this.fetchUser();
  }

  ngOnInit(): void {

  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.ngAfterViewInit();
    console.log(this.pageIndex);
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.ngAfterViewInit();
    console.log(this.pageSize);
  }

  onSortChange(event: { key: string, order: SortOrder }) {
    this.sort.key = event.key;
    this.sort.order = event.order;
    this.ngAfterViewInit();
    console.log(event);
  }

  onSearchChange(search: string) {
    this.search = search;
    this.ngAfterViewInit();
  }

  onOpenAdd() {
    // this.isVisibleDialog = true;
    this.isAddUser = true;
  }

  onClose() {
    // this.isVisibleDialog = false;
    this.isAddUser = false;
    this.isUpdateUser = false;
  }


  onSubmit() {
    this.apiService.addRole({name: this.name})
  }

  onStartUpdate(rowData: any) {
    this.isUpdateUser = true;
    this.updateId = rowData.id;
    console.log(rowData.id);
  }
}
