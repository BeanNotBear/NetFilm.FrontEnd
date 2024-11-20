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
import {DialogComponent} from "../dialog/dialog.component";
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

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
        MovieAreaComponent,
        DialogComponent,
        CommonModule
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
  isOpen = false;
  isViewing = true;
  currentUserId = 'USER_ID_PLACEHOLDER';
  userCurrentRating = 0;
  maxRating = 5;
  hasUserVoted = false; // Biến kiểm tra trạng thái vote

  movideIdDialog!: string;
  movieDetails!: MovieResponseDto;

  playerState$!: Observable<string>;

  constructor(private playerState: PlayerStateService,
              private route: ActivatedRoute,
              private movieService: MovieService,
              private http: HttpClient,
              private authService: AuthService) {
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

  onCloseDialog(isOpen: boolean) {
    this.isOpen = isOpen;
  }

  onOpenDialog(movieId: string) {
    console.log(movieId);
    this.movideIdDialog = movieId;
    this.isOpen  = true;
    this.fetchMovieDetailsDialog();
  }

  onAddView(id: string) {
    if (this.isViewing) {
      this.isViewing = false;
      this.movieService.addView(id).subscribe({
        next: value => {

        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

  fetchMovieDetailsDialog() {
    this.movieService.getMovieDetails(this.movideIdDialog).subscribe({
      next: data => {
        this.movieDetails = data;
      },
      error: err => {
        console.error(err);
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

  async ngOnInit() {
    const token = localStorage.getItem('token') ?? '';
    const decodedToken = this.authService.parseJwt(token);
    const userEmail = decodedToken?.email;
    await this.authService.getUserByEmail(userEmail).subscribe({
      next: (data) => {
        console.log('User data:', data);
        console.log({ 'data.id': data.id })
        this.currentUserId = data.id;
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
    await this.getCurrentStarByUser();
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
  
  getCurrentStarByUser() {
    this.http.get<any[]>(`https://localhost:7027/api/Vote`).subscribe({
      next: (votes) => {
        const userVote = votes.find(
          (vote) => vote.movieId === this.movieId && vote.userId === this.currentUserId
        );
        console.log({userVote})
        if (userVote) {
          // console.log({userVote})
          this.userCurrentRating = userVote.star; // Gán sao đã vote
          this.hasUserVoted = true; // Đánh dấu đã vote
        } else {
          this.userCurrentRating = 0; // Không có vote
          this.hasUserVoted = false; // Đánh dấu chưa vote
        }
      },
      error: (err) => console.error('Error fetching votes', err),
    });
  }
  isDialogOpen = false;
  // This method will be triggered when the user selects a rating (star)
  onRateChange(event: number): void {
    console.log('Rate change event:', event);  // Log the rating received from app-rate
    this.userCurrentRating = event;
    this.isDialogOpen = true;  // Open the confirmation dialog
  }

  // This method will be triggered when the user confirms the vote
  onConfirmVote() {
    this.submitVote(); // Call the method to submit the vote
    this.isDialogOpen = false; // Close the dialog
  }

  // This method will be triggered when the user cancels the vote
  onCancelVote() {
    this.isDialogOpen = false; // Close the dialog without submitting the vote
    // Optionally reset the rating if the user cancels
    this.userCurrentRating = 0;
  }
  submitVote() {
    const apiUrl = 'https://localhost:7027/api/Vote';

    const votePayload = {
      movieId: this.movieId,
      userId: this.currentUserId,
      star: this.userCurrentRating,
    };

    if (this.hasUserVoted) {
      // User has voted before -> Call PUT
      this.http.put(apiUrl, votePayload).subscribe({
        next: () => {
          console.log('Vote updated successfully');
          this.fetchMovieDetails(); // Refresh movie details
        },
        error: (err) => console.error('Error updating vote', err),
      });
    } else {
      // User has not voted -> Call POST
      this.http.post(apiUrl, votePayload).subscribe({
        next: () => {
          console.log('Vote submitted successfully');
          this.fetchMovieDetails(); // Refresh movie details
          this.hasUserVoted = true;
        },
        error: (err) => console.error('Error submitting vote', err),
      });
    }
  }
}
