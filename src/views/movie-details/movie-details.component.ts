import { Component } from '@angular/core';
import { RateComponent } from "../rate/rate.component";
import { DateService } from "../../service/date.service";
import { TabComponent } from "../tab/tab.component";
import { MovieSiderComponent } from "../movie-sider/movie-sider.component";
import { TabDirective } from "../../directives/tab.directive";
import { CommentComponent } from "../comment/comment.component";
import { ContentDirective } from "../../directives/content.directive";
import { ActivatedRoute, Router } from "@angular/router";
import { MovieService } from "../../service/movie.service";
import { MovieResponseDto } from "../../models/movieDtos/movie.response.dto";
import { MovieViewerDto } from "../../models/movieDtos/movie.viewer.dto";
import { MovieParam } from "../../models/movieDtos/movie.param";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    RateComponent,
    TabComponent,
    MovieSiderComponent,
    TabDirective,
    CommentComponent,
    ContentDirective,
    CommonModule
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
  isVotePopupVisible = false;
  currentUserId = 'USER_ID_PLACEHOLDER';
  userCurrentRating = 0;
  maxRating = 5;

  constructor(private dateService: DateService,
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private http: HttpClient,
    private authService: AuthService) {
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
    const token = localStorage.getItem('token') ?? '';

    const decodedToken = this.authService.parseJwt(token);

    const userEmail = decodedToken?.email;
    this.authService.getUserByEmail(userEmail).subscribe({
      next: (data) => {
        console.log('User data:', data);
        console.log({ 'data[0].id': data[0].id })
        this.currentUserId = data[0].id;
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
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
        this.movies = value.items;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  formatReleaseDate(): string {
    return this.dateService.formatDate(this.releaseDate);
  }

  hasUserVoted = false; // Biến kiểm tra trạng thái vote

  openVotePopup() {
    this.isVotePopupVisible = true;

    // Fetch the user's current vote
    this.http.get<any[]>(`http://localhost:5042/api/Vote`).subscribe({
      next: (votes) => {
        const userVote = votes.find(
          (vote) => vote.movieId === this.movieId && vote.userId === this.currentUserId
        );
        if (userVote) {
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

  closeVotePopup() {
    this.isVotePopupVisible = false;
  }

  submitVote() {
    const apiUrl = 'http://localhost:5042/api/Vote';
  
    const votePayload = {
      movieId: this.movieId,
      userId: this.currentUserId,
      star: this.userCurrentRating,
    };
  
    if (this.hasUserVoted) {
      // User đã vote -> Gọi PUT
      this.http.put(apiUrl, votePayload).subscribe({
        next: () => {
          console.log('Vote updated successfully');
          this.fetchMovieDetails(); // Làm mới chi tiết phim
          this.closeVotePopup(); // Đóng popup
        },
        error: (err) => console.error('Error updating vote', err),
      });
    } else {
      // User chưa vote -> Gọi POST
      this.http.post(apiUrl, votePayload).subscribe({
        next: () => {
          console.log('Vote submitted successfully');
          this.fetchMovieDetails(); // Làm mới chi tiết phim
          this.closeVotePopup(); // Đóng popup
        },
        error: (err) => console.error('Error submitting vote', err),
      });
    }
  }
  

}
