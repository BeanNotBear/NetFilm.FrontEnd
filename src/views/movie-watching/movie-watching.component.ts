import {Component} from '@angular/core';
import {VgApiService, VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import {PlayerStateService} from "../../service/player-state.service";
import {Observable} from "rxjs";
import {RateComponent} from "../rate/rate.component";
import {CommentComponent} from "../comment/comment.component";
import {ContentDirective} from "../../directives/content.directive";
import {TabComponent} from "../tab/tab.component";
import {TabDirective} from "../../directives/tab.directive";
import {MoviesComponent} from "../movies/movies.component";
import {MovieAreaComponent} from "../movie-area/movie-area.component";
import {ActivatedRoute} from "@angular/router";
import {MovieService} from "../../service/movie.service";
import {MovieResponseDto} from "../../models/movieDtos/movie.response.dto";
import {MovieParam} from "../../models/movieDtos/movie.param";
import {MovieViewerDto} from "../../models/movieDtos/movie.viewer.dto";

@Component({
  selector: 'app-movie-watching',
  standalone: true,
  imports: [
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    RateComponent,
    CommentComponent,
    ContentDirective,
    TabComponent,
    TabDirective,
    MoviesComponent,
    MovieAreaComponent
  ],
  templateUrl: './movie-watching.component.html',
  styleUrl: './movie-watching.component.scss'
})
export class MovieWatchingComponent {
  preload: string = 'auto';
  api!: VgApiService;
  movieId!: string;
  movie!: MovieResponseDto;
  topviews: MovieViewerDto[] = [];
  mostRates: MovieViewerDto[] = [];

  playerState$!: Observable<string>;

  constructor(private playerState: PlayerStateService,
              private route: ActivatedRoute,
              private movieService: MovieService) {
    this.route.params.subscribe({
      next: param => {
        this.movieId = param['movieId'];
        this.fetchMovieDetails();
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

  ngOnInit() {
    this.playerState$ = this.playerState.state$;
    this.fetchTopViews();
    this.fetchMostRate();
  }

  onPlayerReady(api: VgApiService) {
    console.log('playerReady');
    this.api = api;
    this.api.getDefaultMedia().subscriptions.play.subscribe(
      (event) => {
        this.playerState.updatePlayerState('play');
      }
    );

    this.api.getDefaultMedia().subscriptions.pause.subscribe(
      (event) => {
        this.playerState.updatePlayerState('pause');
      }
    );
  }

  fetchTopViews() {
    const movieParam = new MovieParam(
      1,
      6,
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
      'totalviews',
      false
    );
    this.movieService.getMoviesViewer(movieParam).subscribe({
      next: data => {
        console.log(data);
        this.topviews = data.items;
      },
      error: err => {
        console.error(err)
      }
    });
  }

  fetchMostRate() {
    const movieParam = new MovieParam(
      1,
      6,
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
      next: data => {
        console.log(data);
        this.mostRates = data.items;
      },
      error: err => {
        console.error(err)
      }
    });
  }
}
