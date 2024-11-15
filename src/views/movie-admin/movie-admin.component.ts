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
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {CountryDto} from "../../models/countryDtos/country.dto";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {Observable} from "rxjs";
import {PosterUploadComponent} from "../poster-upload/poster-upload.component";
import {MovieResponseDto} from "../../models/movieDtos/movie.response.dto";
import {CountryService} from "../../service/country.service";
import {ParticipantService} from "../../service/participant.service";
import {ParticipantDto} from "../../models/participantDtos/participant.dto";
import {CategoryService} from "../../service/category.service";
import {CategoryDto} from "../../models/categoryDtos/category.dto";
import {MovieService} from "../../service/movie.service";

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
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  templateUrl: './movie-admin.component.html',
  styleUrl: './movie-admin.component.scss'
})
export class MovieAdminComponent {
  alowUploadFileTypes = 'video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo,video/x-flv,video/3gpp,video/x-matroska';
  isVisibleDialog  = false;
  isVisibleLoading = false;
  movie: MovieResponseDto = new MovieResponseDto();
  posterFile!: NzUploadFile;
  countries: CountryDto[] = [];
  participants: ParticipantDto[] = [];
  categories: CategoryDto[] = [];
  qualities: {value: number; name: string}[] = [
    {value: 0, name: 'HD'},
    {value: 1, name: 'Full HD'}
  ];
  apiUrl = '';

  constructor(private countryService: CountryService,
              private participantService: ParticipantService,
              private categoryService: CategoryService,
              private movieService: MovieService) {
  }

  apiKey = '0vuhsazgiv5rjydoflr0l0zbhd3khd54mgka0cgti58u6pld';
  init: EditorComponent['init'] = {
    base_url: '/tinymce', // Root for resources
    suffix: '.min',        // Suffix to use when loading resources
    menubar: true,
    automatic_uploads: true
  };

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

  fetchCountry() {
    this.countryService.getCountries().subscribe({
      next: data => {
        console.log(data);
        this.countries = data;
      },
      error: err =>  {
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
      error: err =>  {
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
      error: err =>  {
        console.error(err)
      }
    });
  }

  onNext() {
    console.log(this.movie);
    console.log(new Date(this.movie.release_Date).toISOString())
    console.log(this.posterFile);
    this.movieService.updateMovieDetails(this.movie, this.posterFile).subscribe({
      next: data => {

      },
      error: err =>  {
        console.error(err)
      }
    });
  }

  onUploadPoster(file: NzUploadFile) {
    console.log(file);
    this.posterFile = file;
  }
}
