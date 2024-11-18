import {Component} from '@angular/core';
import {RateComponent} from "../rate/rate.component";
import {DateService} from "../../service/date.service";
import {TabComponent} from "../tab/tab.component";
import {MovieSiderComponent} from "../movie-sider/movie-sider.component";
import {TabDirective} from "../../directives/tab.directive";
import {CommentComponent} from "../comment/comment.component";
import {ContentDirective} from "../../directives/content.directive";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../service/movie.service";
import {MovieResponseDto} from "../../models/movieDtos/movie.response.dto";
import {MovieViewerDto} from "../../models/movieDtos/movie.viewer.dto";
import {MovieParam} from "../../models/movieDtos/movie.param";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    RateComponent,
    TabComponent,
    MovieSiderComponent,
    TabDirective,
    CommentComponent,
    ContentDirective
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  formattedReleaseDate!: string;
  releaseDate = '08/29/2003';
  movieId!: string;
  movie!: MovieResponseDto;
  movies: MovieViewerDto[] = [];

  constructor(private dateService: DateService,
              private route: ActivatedRoute,
              private router: Router,
              private movieService: MovieService) {
    this.route.params.subscribe({
      next: param => {
        this.movieId = param['movieId'];
        this.fetchMovieDetails();
        this.releaseDate = this.movie.release_Date;
        console.log(this.movieId);
      },
      error: err => {
        console.error(err)
      }
    });
    this.fetchMovies();
  }

  onView(id: string) {
    this.router.navigate([`movie/${id}/watch`]);
  }

  fetchMovieDetails() {
    this.movieService.getMovieDetails(this.movieId).subscribe({
      next: data => {
        this.movie = data;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  fetchMovies() {
    const movieParam = new MovieParam(
      1,
      4,
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
      'averagestar',
      false
    );
    this.movieService.getMoviesViewer(movieParam).subscribe({
      next: value => {
        this.movies  = value.items;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  formatReleaseDate(): string {
    return this.dateService.formatDate(this.releaseDate);
  }
}
