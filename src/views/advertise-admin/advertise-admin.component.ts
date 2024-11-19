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
import { AuthService } from '../../service/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import Swal from 'sweetalert2';

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
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private message: NzMessageService
  ) {
    this.userId = this.authService.parseJwt(
      localStorage.getItem('token') ?? ''
    ).id;
  }

  userId: string = '';
  COL_DATA_TYPE = COL_DATA_TYPE;

  loading = false;

  isVisible = false;
  isOkLoading = false;
  isUpdate = false;
  advertiseUpdateId: string = '';
  title: string = '';
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
    this.isUpdate = false;
    this.title = 'Create Advertise';
  }

  onSubmit() {
    if (this.createForm.valid && this.fileList.length > 0) {
      const formData = new FormData();
      const file = this.fileList[0].originFileObj;
      const advertise: AddAdvertiseDto = {
        title: this.createForm.value.title,
        content: this.createForm.value.content,
        userId: this.userId,
      };

      formData.append('File', file!);
      formData.append('Title', advertise.title);
      formData.append('Content', advertise.content);
      formData.append('UserId', advertise.userId);

      this.apiService.addAdvertise(formData).subscribe(() => {
        Swal.fire({
          title: 'Created!',
          text: 'Advertise has been created.',
          icon: 'success',
        }).then(() => {
          this.loadAdvertise();
          this.createForm.value.title = '';
          this.createForm.value.content = '';
          this.fileList = [];
        });
      });
    } else {
      this.message.error(
        'Please fill in all data fields completely and correctly.'
      );
    }
  }

  beforeUpload = (file: any): boolean => {
    if (file.size === 0) {
      this.message.error('Please choose a image file!');
    }
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg';
    if (!isJpgOrPng) {
      this.message.error('You can only upload JPG/PNG/JPEG file!');
      return false;
    }
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      this.message.error('Image must smaller than 20MB!');
      return false;
    }
    this.fileList.push(file);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.fileList = [
        {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: e.target.result,
          originFileObj: file,
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

  deleteAdvertise(advertiseId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to delete this advertise!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteAdvertise(advertiseId).subscribe(() => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          }).then(() => {
            this.loadAdvertise();
          });
        });
      }
    });
  }

  onOpenUpdate(advertise: any) {
    this.title = 'Update Advertise';
    this.isUpdate = true;
    this.isVisible = true;
    this.createForm.setValue({
      title: advertise.title,
      content: advertise.content,
    });
    this.advertiseUpdateId = advertise.id;
  }

  updateAdvertise() {
    if (this.createForm.valid) {
      const formData = new FormData();
      let file = null;
      if (this.fileList.length != 0) {
        file = this.fileList[0].originFileObj;
      } else {
        file = null;
      }
      const advertise: AddAdvertiseDto = {
        title: this.createForm.value.title,
        content: this.createForm.value.content,
        userId: this.userId,
      };

      formData.append('imageFile', file!);
      formData.append('Title', advertise.title);
      formData.append('Content', advertise.content);
      formData.append('UserId', advertise.userId);

      this.apiService
        .updateAdvertise(this.advertiseUpdateId, formData)
        .subscribe(() => {
          Swal.fire({
            title: 'Updated!',
            text: 'Advertise has been updated.',
            icon: 'success',
          }).then(() => {
            this.loadAdvertise();
            this.createForm.value.title = '';
            this.createForm.value.content = '';
            this.fileList = [];
          });
        });
    } else {
      this.message.error('Please fill in title and content field.');
    }
  }
}
