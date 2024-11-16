import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MoviesComponent} from "../movies/movies.component";
import {MovieViewerDto} from "../../models/movieDtos/movie.viewer.dto";

@Component({
  selector: 'app-movie-area',
  standalone: true,
    imports: [
        MoviesComponent
    ],
  templateUrl: './movie-area.component.html',
  styleUrl: './movie-area.component.scss'
})
export class MovieAreaComponent {
  @Input({required: true}) areaName!: string;
  @Input() visibleViewAll: boolean = true;
  @Input() movies!: MovieViewerDto[];
  @Output() selectMovie = new EventEmitter<string>();

  onSelectMovie(id: string) {
    this.selectMovie.emit(id);
  }
}
