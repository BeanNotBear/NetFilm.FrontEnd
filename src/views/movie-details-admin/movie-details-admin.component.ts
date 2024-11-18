import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogAdminComponent} from "../dialog-admin/dialog-admin.component";
import {DialogDirective} from "../../directives/dialog.directive";
import {DialogContentDirective} from "../../directives/dialog-content.directive";
import {MovieService} from "../../service/movie.service";
import {MovieResponseDto} from "../../models/movieDtos/movie.response.dto";
import {DateService} from "../../service/date.service";

@Component({
  selector: 'app-movie-details-admin',
  standalone: true,
  imports: [
    DialogAdminComponent,
    DialogDirective,
    DialogContentDirective
  ],
  templateUrl: './movie-details-admin.component.html',
  styleUrl: './movie-details-admin.component.scss'
})
export class MovieDetailsAdminComponent {
  @Input({required: true}) movie!: MovieResponseDto;
  @Input() isVisible = false;
  @Output() closeMovieDetails = new EventEmitter();

  constructor(private dateService: DateService) {
  }

  getDate(date: string) {
    return this.dateService.formatDate(date);
  }
}
