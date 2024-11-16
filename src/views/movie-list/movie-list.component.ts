import {Component, OnInit} from '@angular/core';
import {MovieAreaComponent} from "../movie-area/movie-area.component";
import {MovieService} from "../../service/movie.service";
import {MovieViewerDto} from "../../models/movieDtos/movie.viewer.dto";
import {MovieParam} from "../../models/movieDtos/movie.param";
import {CategoryService} from "../../service/category.service";
import {CountryService} from "../../service/country.service";
import {CategoryDto} from "../../models/categoryDtos/category.dto";
import {CountryDto} from "../../models/countryDtos/country.dto";
import {FormsModule} from "@angular/forms";
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import {PageResult} from "../../models/common/pageResult.model";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    MovieAreaComponent,
    FormsModule,
    NzPaginationModule
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit {
  categories: CategoryDto[] = [];
  countries: CountryDto[] = [];
  pageSizeOptions: number[] = [12, 18, 24];
  pagedResult: PageResult<MovieViewerDto> = new class implements PageResult<MovieViewerDto> {
    hasNext: boolean = false;
    hasPrevious: boolean = false;
    items: MovieViewerDto[] = [];
    pageIndex: number = 1;
    pageSize: number = 1;
    totalItems: number = 1;
    totalPages: number = 1;
  }
  movieParam = new MovieParam(
    1,
    12,
    "",
    null,
    -1,
    null,
    null,
    "",
    "",
    null,
    null,
    false,
    null,
    null,
    null
  );

  constructor(private movieService: MovieService,
              private categoryService: CategoryService,
              private countryService: CountryService) {

  }

  ngOnInit(): void {
    this.fetchMovies();
    this.fetchCategory();
    this.fetchCountry();
  }

  onChange() {
    this.fetchMovies();
  }

  onPageIndexChange(pageIndex: number) {
    this.movieParam.pageIndex = pageIndex;
    this.onChange();
  }

  onPageSizeChange(pageSize: number) {
    this.movieParam.pageSize = pageSize;
    this.onChange();
  }

  fetchMovies() {
    this.movieService.getMoviesViewer(this.movieParam).subscribe({
      next: data => {
        this.pagedResult = data;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  fetchCategory() {
    this.categoryService.getCategories().subscribe({
      next: data => {
        this.categories = data;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  fetchCountry() {
    this.countryService.getCountries().subscribe({
      next: data => {
        this.countries = data;
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
