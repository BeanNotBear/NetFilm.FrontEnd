import {Component, Input, OnInit} from '@angular/core';
import {MovieResponseDto} from "../../models/movieDtos/movie.response.dto";
import {FormsModule} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {PosterUploadComponent} from "../poster-upload/poster-upload.component";
import {CountryService} from "../../service/country.service";
import {CategoryService} from "../../service/category.service";
import {ParticipantService} from "../../service/participant.service";
import {CountryDto} from "../../models/countryDtos/country.dto";
import {CategoryDto} from "../../models/categoryDtos/category.dto";
import {ParticipantDto} from "../../models/participantDtos/participant.dto";
import {MovieService} from "../../service/movie.service";
import {MessageService} from "primeng/api";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-movie-information-update',
  standalone: true,
  imports: [
    FormsModule,
    NzInputDirective,
    EditorComponent,
    NzDatePickerComponent,
    NzOptionComponent,
    NzSelectComponent,
    PosterUploadComponent
  ],
  templateUrl: './movie-information-update.component.html',
  styleUrl: './movie-information-update.component.scss'
})
export class MovieInformationUpdateComponent implements OnInit {
  @Input() movie!: MovieResponseDto;
  apiKey = '0vuhsazgiv5rjydoflr0l0zbhd3khd54mgka0cgti58u6pld';
  init: EditorComponent['init'] = {
    base_url: '/tinymce', // Root for resources
    suffix: '.min',        // Suffix to use when loading resources
    menubar: true,
    automatic_uploads: true
  };

  constructor(private countryService: CountryService,
              private categoryService: CategoryService,
              private participantService: ParticipantService,
              private movieService: MovieService,
              private messageService: NzMessageService) {
  }

  countries: CountryDto[] = [];
  categories: CategoryDto[] = [];
  participants: ParticipantDto[] = [];
  categoryIds: string[] = [];
  participantIds: string[] = [];
  countryId!: string;

  qualities: { value: number; name: string }[] = [
    {value: 0, name: 'HD'},
    {value: 1, name: 'Full HD'}
  ];

  onSubmit() {
    this.movie.categories = this.categories.filter(category => this.categoryIds.includes(category.id))
    this.movie.participants = this.participants.filter(par =>  this.participantIds.includes(par.id))
    this.movie.country = this.countries.find(country => (country.id === this.countryId)) || this.movie.country;
    this.movieService.updateMovieInformation(this.movie).subscribe({
      next: value => {
        this.movie = value;
        this.messageService.success('Update successfully');
      },
      error: err => {
        console.error(err);
        this.messageService.error('Update fail!!!')
      }
    })
  }

  ngOnInit() {
    this.categoryIds = this.movie.categories.map(x => x.id);
    this.participantIds = this.movie.participants.map(x => x.id);
    this.countryId = this.movie.country.id;
    this.fetchCountry();
    this.fetchCategory();
    this.fetchParticipants();
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
}
