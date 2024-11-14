import { Component } from '@angular/core';
import { COL_DATA_TYPE, SortOrder } from '../table/models/types';
import { ColumnDirective } from '../table/components/column.directive';
import { TableComponent } from '../table/table.component';
import { ApiService } from '../../api/api.service';
import { PageResult } from '../../models/common/pageResult.model';
import { CellDirective } from '../table/components/cell.directive';
import { NzButtonComponent, NzButtonSize } from 'ng-zorro-antd/button';
import { NzTableCellDirective } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { HeaderDirective } from '../table/components/header.directive';
import { DialogAdminComponent } from '../dialog-admin/dialog-admin.component';
import { DialogDirective } from '../../directives/dialog.directive';
import { DialogContentDirective } from '../../directives/dialog-content.directive';
import { FormsModule } from '@angular/forms';
import { CategoryDto } from '../../models/categoryDtos/categoryDto.model';
import { AddCategoryDto } from '../../models/categoryDtos/addCategoryDto.model';

@Component({
  selector: 'app-category-admin',
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
  ],
  templateUrl: './category-admin.component.html',
  styleUrl: './category-admin.component.scss',
})
export class CategoryAdminComponent {
  constructor(private apiService: ApiService) {}

  COL_DATA_TYPE = COL_DATA_TYPE;

  loading = false;
  isVisibleDialog = false;
  isLoandingDialod = false;

  pageIndex: number = 1;
  pageSize: number = 10;
  sort: { key: string; order: SortOrder } = { key: '', order: null };
  search: string = '';

  nameCategory!: string;

  pageResult: PageResult<CategoryDto> = new (class
    implements PageResult<CategoryDto>
  {
    hasNext: boolean = false;
    hasPrevious: boolean = false;
    items: CategoryDto[] = [];
    pageIndex: number = 0;
    pageSize: number = 0;
    totalItems: number = 0;
    totalPages: number = 0;
  })();

  loadCategory(): void {
    this.loading = true;
    this.apiService
      .getCategoriesPagination(
        this.pageIndex,
        this.pageSize,
        this.search,
        this.sort.key,
        this.sort.order == 'ascend'
      )
      .subscribe((reponse) => {
        this.pageResult = reponse;
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.loadCategory();
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.loadCategory();
    console.log(this.pageIndex);
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.loadCategory();
    console.log(this.pageSize);
  }

  onSortChange(event: { key: string; order: SortOrder }) {
    this.sort.key = event.key;
    this.sort.order = event.order;
    this.loadCategory();
    console.log(event);
  }

  onSearchChange(search: string) {
    this.search = search;
    this.loadCategory();
  }

  onOpenAdd() {
    this.isVisibleDialog = true;
  }

  onClose() {
    this.isVisibleDialog = false;
  }

  onSubmit() {
    const newCategory: AddCategoryDto = {
      name: this.nameCategory,
    };
    this.apiService.addCategory(newCategory).subscribe(() => {
      this.loadCategory();
    });
  }
}
