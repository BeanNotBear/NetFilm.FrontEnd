import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TabComponent} from "../tab/tab.component";
import {TabDirective} from "../../directives/tab.directive";
import {DialogAdminComponent} from "../dialog-admin/dialog-admin.component";
import {ContentDirective} from "../../directives/content.directive";
import {DialogDirective} from "../../directives/dialog.directive";
import {DialogContentDirective} from "../../directives/dialog-content.directive";
import {MovieResponseDto} from "../../models/movieDtos/movie.response.dto";
import {UploadMovieComponent} from "../upload-movie/upload-movie.component";
import {MovieInformationUpdateComponent} from "../movie-information-update/movie-information-update.component";
import {MovieUpdatePosterComponent} from "../movie-update-poster/movie-update-poster.component";
import {UpdateSubtitleComponent} from "../update-subtitle/update-subtitle.component";
import {MovieService} from "../../service/movie.service";

@Component({
  selector: 'app-movie-update',
  standalone: true,
  imports: [
    TabComponent,
    TabDirective,
    DialogAdminComponent,
    ContentDirective,
    DialogDirective,
    DialogContentDirective,
    UploadMovieComponent,
    MovieInformationUpdateComponent,
    MovieUpdatePosterComponent,
    UpdateSubtitleComponent
  ],
  templateUrl: './movie-update.component.html',
  styleUrl: './movie-update.component.scss'
})
export class MovieUpdateComponent {
  @Input() movie!: MovieResponseDto;
  @Input() isVisible = false;
  @Output() onClose = new EventEmitter();

  constructor(private movieService: MovieService) {
  }

  getMovieDetails(id: string) {
    this.movieService.getMovieDetails(id).subscribe({
      next: value => {
        this.movie = value
      }, error: err => {
        console.error(err);
      }
    })
  }
}
