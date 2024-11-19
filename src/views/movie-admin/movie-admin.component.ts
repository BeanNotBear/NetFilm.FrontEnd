import {Component} from '@angular/core';
import {TabComponent} from "../tab/tab.component";
import {TabDirective} from "../../directives/tab.directive";
import {ContentDirective} from "../../directives/content.directive";
import {TableComponent} from "../table/table.component";
import {ProcessComponent} from "../process/process.component";
import {ProcessDirective} from "../../directives/process.directive";
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {UploadComponent} from "../upload/upload.component";
import {ProcessContentDirective} from "../../directives/process-content.directive";
import {DialogAdminComponent} from "../dialog-admin/dialog-admin.component";
import {DialogDirective} from "../../directives/dialog.directive";
import {DialogContentDirective} from "../../directives/dialog-content.directive";
import {FormsModule} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {EditorComponent, TINYMCE_SCRIPT_SRC} from '@tinymce/tinymce-angular';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {CountryDto} from "../../models/countryDtos/country.dto";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {delay, Observable} from "rxjs";
import {PosterUploadComponent} from "../poster-upload/poster-upload.component";
import {MovieResponseDto} from "../../models/movieDtos/movie.response.dto";
import {CountryService} from "../../service/country.service";
import {ParticipantService} from "../../service/participant.service";
import {ParticipantDto} from "../../models/participantDtos/participant.dto";
import {CategoryService} from "../../service/category.service";
import {CategoryDto} from "../../models/categoryDtos/category.dto";
import {MovieService} from "../../service/movie.service";
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {SubtitleService} from "../../service/subtitle.service";
import {ColumnDirective} from "../table/components/column.directive";
import {CellDirective} from "../table/components/cell.directive";
import {MovieTableComponent} from "../movie-table/movie-table.component";
import {MovieDetailsAdminComponent} from "../movie-details-admin/movie-details-admin.component";
import {MovieUpdateComponent} from "../movie-update/movie-update.component";

@Component({
  selector: 'app-movie-admin',
  standalone: true,
  imports: [
    TabComponent,
    TabDirective,
    ContentDirective,
    TableComponent,
    ProcessComponent,
    ProcessDirective,
    NzButtonComponent,
    UploadComponent,
    ProcessContentDirective,
    DialogAdminComponent,
    DialogDirective,
    DialogContentDirective,
    FormsModule,
    NzInputDirective,
    EditorComponent,
    NzSelectModule,
    NzDatePickerComponent,
    NzTooltipDirective,
    NzUploadComponent,
    PosterUploadComponent,
    ColumnDirective,
    CellDirective,
    MovieTableComponent,
    MovieDetailsAdminComponent,
    MovieUpdateComponent,
  ],
  providers: [
    {provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}
  ],
  templateUrl: './movie-admin.component.html',
  styleUrl: './movie-admin.component.scss'
})
export class MovieAdminComponent {
  alowUploadFileTypes = 'video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo,video/x-flv,video/3gpp,video/x-matroska';
  isVisibleDialog = false;
  isVisibleLoading = false;
  movie: MovieResponseDto = new MovieResponseDto();
  posterFile!: NzUploadFile;
  countries: CountryDto[] = [];
  participants: ParticipantDto[] = [];
  categories: CategoryDto[] = [];
  qualities: { value: number; name: string }[] = [
    {value: 0, name: 'HD'},
    {value: 1, name: 'Full HD'}
  ];
  apiUrl = '';
  numberOfFiles = 0;
  n = Array(this.numberOfFiles).fill(0).map((_, i) => i);
  subtitleName: string[] = [];
  isVisibleSubmit = true;

  subtitleFiles: NzUploadFile[] = [];
  uploading = false;
  fileTypes: string = 'text/vtt';
  canNext = true;

  onChangeSubtitles() {
    this.numberOfFiles = this.subtitleFiles.length;
    this.n = Array(this.numberOfFiles).fill(0).map((_, i) => i);
    console.log(this.subtitleName);
  }

  onDoneProcess() {
    this.isVisibleDialog = false;
  }

  constructor(private countryService: CountryService,
              private participantService: ParticipantService,
              private categoryService: CategoryService,
              private movieService: MovieService,
              private subtitleService: SubtitleService,
              private http: HttpClient,
              private messageService: NzMessageService) {
  }

  apiKey = '0vuhsazgiv5rjydoflr0l0zbhd3khd54mgka0cgti58u6pld';
  init: EditorComponent['init'] = {
    base_url: '/tinymce', // Root for resources
    suffix: '.min',        // Suffix to use when loading resources
    menubar: true,
    automatic_uploads: true
  };

  beforeUpload = (file: NzUploadFile): boolean => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension !== 'vtt') {
      this.messageService.error('Can only upload .vtt files!');
      return false;
    }

    this.subtitleFiles = this.subtitleFiles.concat(file);
    return false; // Prevents the default upload behavior.
  };


  handleUploadSubtitle() {
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.subtitleFiles.forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.subtitleService.uploadSubtitle(this.movie.id, this.subtitleName, this.subtitleFiles);
    this.messageService.success('Add movie successfully!');
    this.isVisibleDialog = false;
    this.subtitleFiles = [];
    this.n = [];
  }

  onUploadMovieDone(movie: MovieResponseDto) {
    console.log(movie);
    this.movie = movie;
    this.apiUrl = `https://localhost:7027/api/Movies/${this.movie.id}/Add/Poster`;
    this.fetchCountry();
    this.fetchParticipants();
    this.fetchCategory();
    console.log(this.countries);
    this.isVisibleDialog = true;
  }

  onCloseDialog() {
    this.isVisibleDialog = false;
  }

  fetchCountry() {
    this.countryService.getCountries().subscribe({
      next: data => {
        console.log(data);
        this.countries = data;
      },
      error: err => {
        console.error(err)
      }
    });
  }

  fetchCategory() {
    this.categoryService.getCategories().subscribe({
      next: data => {
        console.log(data);
        this.categories = data;
      },
      error: err => {
        console.error(err)
      }
    });
  }

  fetchParticipants() {
    this.participantService.getParticipants().subscribe({
      next: data => {
        console.log(data);
        this.participants = data;
      },
      error: err => {
        console.error(err)
      }
    });
  }

  onSubmit() {
    let isValidData = false;
    if (this.movie.name && this.movie.description && this.movie.quality && this.movie.allowing_Age
      && this.movie.release_Date && this.movie.duration && this.movie.country.id && this.movie.categories
      && this.movie.participants) {
      isValidData = true;
    }
    if (isValidData) {
      this.movieService.updateMovieDetails(this.movie).subscribe({
        next: data => {
          this.isVisibleSubmit = false;
        },
        error: err => {
          console.error(err)
        }
      });
    } else {
      console.error('Fail');
    }
  }

  onUploadPoster(file: NzUploadFile) {
    console.log(file);
    this.posterFile = file;
  }

  isVisibleMovieDetails = false;
  movieDetails!: MovieResponseDto;

  onSelectMovie(id: string) {
    this.isVisibleMovieDetails = true;
    this.movieService.getMovieDetails(id).subscribe({
      next: value => {
        this.movieDetails = value;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  onCloseMovieDetails() {
    this.isVisibleMovieDetails = false;
  }

  isVisibleEditMovie = false;
  onEditMovie(id: string) {
    this.isVisibleEditMovie = true;
    this.movieService.getMovieDetails(id).subscribe({
      next: value => {
        this.movieDetails = value;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  onCloseEditMovie() {
    this.isVisibleEditMovie = false;
  }
}
