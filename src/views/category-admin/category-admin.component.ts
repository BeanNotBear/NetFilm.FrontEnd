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
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CategoryDto } from '../../models/categoryDtos/categoryDto.model';
import { AddCategoryDto } from '../../models/categoryDtos/addCategoryDto.model';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import Swal from 'sweetalert2';

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
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    NzModalModule,
  ],
  templateUrl: './category-admin.component.html',
  styleUrl: './category-admin.component.scss',
})
export class CategoryAdminComponent {
  constructor(
    private apiService: ApiService,
    private message: NzMessageService
  ) {}

  COL_DATA_TYPE = COL_DATA_TYPE;

  isVisible = false;
  isOkLoading = false;
  isUpdate = false;
  categoryUpdateId: string = '';
  title: string = '';
  loading = false;
  Form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

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
    this.isVisible = true;
    this.isUpdate = false;
    this.title = 'Create Category';
  }

  onClose() {
    this.isVisible = false;
  }

  onSubmit() {
    if (this.Form.valid) {
      const newCategory: AddCategoryDto = {
        name: this.Form.value.name,
      };
      this.apiService.addCategory(newCategory).subscribe(
        (reponse) => {
          Swal.fire({
            title: 'Created!',
            text: 'Category has been created.',
            icon: 'success',
          }).then(() => {
            this.loadCategory();
            this.Form.value.name = '';
          });
        },
        (error) => {
          this.message.error(error.error.detail);
        }
      );
    } else {
      ('Please input name of category');
    }
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
      if (this.isUpdate == true) {
        this.updateAdvertise();
      } else {
        this.onSubmit();
      }
    }, 100);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onOpenUpdate(category: any) {
    this.title = 'Update Category';
    this.isUpdate = true;
    this.isVisible = true;
    this.Form.setValue({
      name: category.name,
    });
    this.categoryUpdateId = category.id;
  }

  updateAdvertise() {
    if (this.Form.valid) {
      const updateCategory: AddCategoryDto = {
        name: this.Form.value.name,
      };
      this.apiService
        .updateCategory(this.categoryUpdateId, updateCategory)
        .subscribe(
          (reponse) => {
            Swal.fire({
              title: 'Updated!',
              text: 'Category has been updated.',
              icon: 'success',
            }).then(() => {
              this.loadCategory();
              this.Form.value.name = '';
            });
          },
          (error) => {
            this.message.error(error.error.detail);
          }
        );
    } else {
      ('Please input name of category');
    }
  }
}
