import {Component, OnInit} from '@angular/core';
import {MovieAreaComponent} from "../movie-area/movie-area.component";
import {MovieService} from "../../service/movie.service";
import {MovieViewerDto} from "../../models/movieDtos/movie.viewer.dto";
import {MovieParam} from "../../models/movieDtos/movie.param";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    MovieAreaComponent
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit{
  movies: MovieViewerDto[] = [];
  constructor(private movieService: MovieService) {

  }

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies() {
    const movieParam = new MovieParam(
      1,
      12,
      "",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      false,
      null,
      null,
      null
    );
    this.movieService.getMoviesViewer(movieParam).subscribe({
      next: data => {
        this.movies = data.items;
      },
      error: err => {

      }
    });
  }


}
