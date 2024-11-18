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
import { DialogAdminComponent } from '../dialog-admin/dialog-admin.component';
import { DialogDirective } from '../../directives/dialog.directive';
import { DialogContentDirective } from '../../directives/dialog-content.directive';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { AdvertiseDto } from '../../models/advertiseDtos/advertiseDto.model';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AddAdvertiseDto } from '../../models/advertiseDtos/addAdvertiseDto.model';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AddFileAdvertiseDto } from '../../models/advertiseDtos/addAdvertiseFileDto.model';

@Component({
  selector: 'app-advertise-admin',
  standalone: true,
  imports: [
    ColumnDirective,
    TableComponent,
    CellDirective,
    NzButtonComponent,
    NzTableCellDirective,
    NzDividerModule,
    DialogAdminComponent,
    DialogDirective,
    DialogContentDirective,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzUploadModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
  ],
  templateUrl: './advertise-admin.component.html',
  styleUrl: './advertise-admin.component.scss',
})
export class AdvertiseAdminComponent {
  constructor(private apiService: ApiService) {}

  COL_DATA_TYPE = COL_DATA_TYPE;

  loading = false;

  isVisible = false;
  isOkLoading = false;

  pageIndex: number = 1;
  pageSize: number = 10;
  sort: { key: string; order: SortOrder } = { key: '', order: null };
  search: string = '';

  createForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  fileList: NzUploadFile[] = [];

  pageResult: PageResult<AdvertiseDto> = new (class
    implements PageResult<AdvertiseDto>
  {
    hasNext: boolean = false;
    hasPrevious: boolean = false;
    items: AdvertiseDto[] = [];
    pageIndex: number = 0;
    pageSize: number = 0;
    totalItems: number = 0;
    totalPages: number = 0;
  })();

  loadAdvertise(): void {
    this.loading = true;
    this.apiService
      .getAdvertisesPagination(
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
    this.loadAdvertise();
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.loadAdvertise();
    console.log(this.pageIndex);
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.loadAdvertise();
    console.log(this.pageSize);
  }

  onSortChange(event: { key: string; order: SortOrder }) {
    this.sort.key = event.key;
    this.sort.order = event.order;
    this.loadAdvertise();
    console.log(event);
  }

  onSearchChange(search: string) {
    this.search = search;
    this.loadAdvertise();
  }

  onOpenAdd() {
    this.isVisible = true;
  }

  onSubmit() {
    if (this.createForm.valid) {
      const advertiseFile: AddFileAdvertiseDto = {
        file: this.fileList[0].originFileObj,
      };
      const advertise: AddAdvertiseDto = {
        title: this.createForm.value.title,
        content: this.createForm.value.content,
        createBy: '919C241A-E503-4133-BB71-3AE9F5A19ECD',
      };

      this.apiService.addAdvertise(advertise, advertiseFile).subscribe(() => {
        this.loadAdvertise();
        this.createForm.value.title = '';
        this.createForm.value.content = '';
        this.fileList = [];
      });
    }
  }

  beforeUpload = (file: any): boolean => {
    this.fileList.push(file);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.fileList = [
        {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: e.target.result,
        },
      ];
    };
    reader.readAsDataURL(file);
    return false;
  };

  handleChange(event: any): void {
    const fileList = event.fileList;
    if (fileList.length > 1) {
      this.fileList = [fileList[fileList.length - 1]];
    } else {
      this.fileList = fileList;
    }
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
      this.onSubmit();
    }, 100);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
