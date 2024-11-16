import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MovieComponent} from "../movie/movie.component";
import {MovieViewerDto} from "../../models/movieDtos/movie.viewer.dto";

export interface Movie {
  id: number;
  imageUrl: string
}

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    MovieComponent
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {

  @Input() movies: MovieViewerDto[] = [];
  @Output() selectMovie = new EventEmitter<string>();

  onSelectMovie(id: string) {
    this.selectMovie.emit(id);
  }
}
