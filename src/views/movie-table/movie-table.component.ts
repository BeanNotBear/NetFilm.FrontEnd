import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CellDirective} from "../table/components/cell.directive";
import {ColumnDirective} from "../table/components/column.directive";
import {TableComponent} from "../table/table.component";
import {PageResult} from "../../models/common/pageResult.model";
import {MovieManageDto} from "../../models/movieDtos/movie.manage.dto";
import {MovieParam} from "../../models/movieDtos/movie.param";
import {MovieService} from "../../service/movie.service";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzTableCellDirective} from "ng-zorro-antd/table";
import {COL_DATA_TYPE, SortOrder} from "../table/models/types";
import {NzDividerModule} from "ng-zorro-antd/divider";

@Component({
  selector: 'app-movie-table',
  standalone: true,
  imports: [
    CellDirective,
    ColumnDirective,
    TableComponent,
    NzButtonComponent,
    NzTableCellDirective,
    NzDividerModule
  ],
  templateUrl: './movie-table.component.html',
  styleUrl: './movie-table.component.scss'
})
export class MovieTableComponent implements OnInit{

  @Output() selectMovie = new EventEmitter<string>();
  @Output() editMovie = new EventEmitter<string>();

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.fetchMovies();
  }

  // animation var
  loading = false;

  // data type valid
  COL_DATA_TYPE = COL_DATA_TYPE;

  pageResult: PageResult<MovieManageDto> = new class implements PageResult<MovieManageDto> {
    hasNext: boolean = false;
    hasPrevious: boolean = false;
    items: MovieManageDto[] = [];
    pageIndex: number = 1;
    pageSize: number = 1;
    totalItems: number = 1;
    totalPages: number = 1;
  }

  movieParam: MovieParam = new MovieParam(
    1,
    10,
    "",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    false,
    null,
    'releasedate',
    false
  );

  onPageIndexChange(pageIndex: number) {
    this.movieParam.pageIndex = pageIndex;
    this.fetchMovies();
  }

  fetchMovies() {
    this.loading = true;
    return this.movieService.getMoviesManagement(this.movieParam).subscribe({
      next: value => {
        this.loading = false
        this.pageResult = value;
        console.log(value)
      },
      error: err => {
        console.error(err)
      }
    });
  }

  onPageSizeChange(pageSize: number) {
    this.movieParam.pageSize = pageSize;
    this.fetchMovies();
  }

  onSearchMovie(seach: string) {
    this.movieParam.searchTerm = seach;
    this.fetchMovies();
  }

  onSortChange($event: { key: string; order: SortOrder }) {
    this.movieParam.sortBy = $event.key;
    // alert($event.key)
    this.movieParam.ascending = $event.order === 'ascend';
    this.fetchMovies();
  }
}
