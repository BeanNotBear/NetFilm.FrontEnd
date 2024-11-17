import { Component, ViewChild } from '@angular/core';
import { COL_DATA_TYPE, SortOrder } from '../table/models/types';
import { ColumnDirective } from '../table/components/column.directive';
import { TableComponent } from '../table/table.component';
import { ApiService } from '../../api/api.service';
import { PageResult } from '../../models/common/pageResult.model';
import { CellDirective } from '../table/components/cell.directive';
import { NzButtonComponent, NzButtonSize } from 'ng-zorro-antd/button';
import { NzTableCellDirective } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { FormsModule } from '@angular/forms';
import { CommentDto } from '../../models/commentDtos/commentDto.model';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { HeaderDirective } from '../table/components/header.directive';
import { DialogAdminComponent } from '../dialog-admin/dialog-admin.component';
import { DialogDirective } from '../../directives/dialog.directive';
import { DialogContentDirective } from '../../directives/dialog-content.directive';

@Component({
  selector: 'app-comment-admin',
  standalone: true,
  imports: [
    ColumnDirective,
    TableComponent,
    CellDirective,
    NzButtonComponent,
    NzTableCellDirective,
    NzDividerModule,
    NzModalModule,
    FormsModule,
    HeaderDirective,
    DialogAdminComponent,
    DialogDirective,
    DialogContentDirective,
  ],
  templateUrl: './comment-admin.component.html',
  styleUrl: './comment-admin.component.scss',
})
export class CommentAdminComponent {
  constructor(private apiService: ApiService, private modal: NzModalService) {}

  @ViewChild('idColumn') idColumn: any;
  COL_DATA_TYPE = COL_DATA_TYPE;

  loading = false;
  isVisibleDialog = false;
  isLoandingDialod = false;

  pageIndex: number = 1;
  pageSize: number = 10;
  sort: { key: string; order: SortOrder } = { key: '', order: null };
  search: string = '';

  nameCategory!: string;

  pageResult: PageResult<CommentDto> = new (class
    implements PageResult<CommentDto>
  {
    hasNext: boolean = false;
    hasPrevious: boolean = false;
    items: CommentDto[] = [];
    pageIndex: number = 0;
    pageSize: number = 0;
    totalItems: number = 0;
    totalPages: number = 0;
  })();

  loadComment(): void {
    this.loading = true;
    this.apiService
      .getCommentsPagination(
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
    this.loadComment();
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.loadComment();
    console.log(this.pageIndex);
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.loadComment();
    console.log(this.pageSize);
  }

  onSortChange(event: { key: string; order: SortOrder }) {
    this.sort.key = event.key;
    this.sort.order = event.order;
    this.loadComment();
    console.log(event);
  }

  onSearchChange(search: string) {
    this.search = search;
    this.loadComment();
  }

  deleteComment(id: string) {
    this.apiService.deleteComment(id).subscribe(() => {
      this.loadComment();
    });
  }

  onOpenAdd() {
    this.isVisibleDialog = true;
  }
}
