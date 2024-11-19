import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MovieAreaComponent } from '../movie-area/movie-area.component';
import { MovieService } from '../../service/movie.service';
import { MovieViewerDto } from '../../models/movieDtos/movie.viewer.dto';
import { MovieParam } from '../../models/movieDtos/movie.param';
import { CategoryService } from '../../service/category.service';
import { CountryService } from '../../service/country.service';
import { CategoryDto } from '../../models/categoryDtos/category.dto';
import { CountryDto } from '../../models/countryDtos/country.dto';
import { FormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PageResult } from '../../models/common/pageResult.model';
import { DialogComponent } from '../dialog/dialog.component';
import { MovieResponseDto } from '../../models/movieDtos/movie.response.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogAdvertiseComponent } from '../dialog-advertise/dialog-advertise/dialog-advertise.component';
import { AdvertiseDto } from '../../models/advertiseDtos/advertiseDto.model';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    MovieAreaComponent,
    FormsModule,
    NzPaginationModule,
    DialogComponent,
    DialogAdvertiseComponent,
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit {
  categories: CategoryDto[] = [];
  countries: CountryDto[] = [];
  pageSizeOptions: number[] = [12, 18, 24];
  isOpen = false;
  movie!: MovieResponseDto;
  advertise!: AdvertiseDto;
  idOpenAdvertise = true;

  pagedResult: PageResult<MovieViewerDto> = new (class
    implements PageResult<MovieViewerDto>
  {
    hasNext: boolean = false;
    hasPrevious: boolean = false;
    items: MovieViewerDto[] = [];
    pageIndex: number = 1;
    pageSize: number = 1;
    totalItems: number = 1;
    totalPages: number = 1;
  })();
  movieParam = new MovieParam(
    1,
    12,
    '',
    null,
    -1,
    null,
    null,
    '',
    '',
    null,
    null,
    false,
    null,
    null,
    null
  );

  constructor(
    private movieService: MovieService,
    private categoryService: CategoryService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (value) => {
        if (value['search']) {
          this.movieParam.searchTerm = value['search'];
          this.fetchMovies();
        }
        if (value['categoryId']) {
          this.movieParam.category = value['categoryId'];
          this.fetchMovies();
        }
        if (value['countryId']) {
          this.movieParam.country = value['countryId'];
          this.fetchMovies();
        }
      },
    });
    this.fetchMovies();
    this.fetchCategory();
    this.fetchCountry();
    this.fetchAdvertise();
  }

  onCloseDialogAdvertise(isOpen: boolean) {
    this.idOpenAdvertise = isOpen;
  }

  onCloseDialog(isOpen: boolean) {
    this.isOpen = isOpen;
  }

  onOpenDialog(movieId: string) {
    console.log(movieId);
    this.isOpen = true;
    this.fetchMovieDetails(movieId);
  }

  fetchMovieDetails(id: string) {
    this.movieService.getMovieDetails(id).subscribe({
      next: (data) => {
        this.movie = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
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
      next: (data) => {
        this.pagedResult = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  fetchCategory() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  fetchCountry() {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  fetchAdvertise() {
    this.apiService.getRandomAdvertise().subscribe((reponse) => {
      this.advertise = reponse;
    });
  }
}
