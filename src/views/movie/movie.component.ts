import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Movie} from "../movies/movies.component";
import {MovieViewerDto} from "../../models/movieDtos/movie.viewer.dto";

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {
  @Input() movie!: MovieViewerDto;
  @Output() selectMovie = new EventEmitter<string>();

  onSelect() {
    this.selectMovie.emit(this.movie.id);
    console.log(this.movie)
  }
}
