import {Component} from '@angular/core';
import {RateComponent} from "../rate/rate.component";
import {DateService} from "../../service/date.service";
import {TabComponent} from "../tab/tab.component";
import {MovieSiderComponent} from "../movie-sider/movie-sider.component";
import {TabDirective} from "../../directives/tab.directive";
import {CommentComponent} from "../comment/comment.component";
import {ContentDirective} from "../../directives/content.directive";
import {ActivatedRoute} from "@angular/router";
import {MovieService} from "../../service/movie.service";
import {MovieResponseDto} from "../../models/movieDtos/movie.response.dto";

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

  constructor(private dateService: DateService,
              private route: ActivatedRoute,
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

  formatReleaseDate(): string {
    return this.dateService.formatDate(this.releaseDate);
  }
}
