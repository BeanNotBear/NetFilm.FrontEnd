import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SliderComponent} from "../slider/slider.component";
import {MoviesComponent} from "../movies/movies.component";
import {MovieAreaComponent} from "../movie-area/movie-area.component";
import {DialogComponent} from "../dialog/dialog.component";
import {MovieService} from "../../service/movie.service";
import {MovieParam} from "../../models/movieDtos/movie.param";
import {MovieViewerDto} from "../../models/movieDtos/movie.viewer.dto";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SliderComponent,
    MoviesComponent,
    MovieAreaComponent,
    DialogComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private movieService: MovieService) {
  }
  isOpen = false;
  topviews: MovieViewerDto[] = [];
  mostRates: MovieViewerDto[] = [];
  newReleases: MovieViewerDto[] = [];
  sliders: MovieViewerDto[] = [];
  onCloseDialog(isOpen: boolean) {
    this.isOpen = isOpen;
  }

  onOpenDialog(isOpen: boolean) {
    this.isOpen  = isOpen;
  }

  ngOnInit(): void {
    this.fetchTopViews();
    this.fetchMostRate();
    this.fetchNewRelease();
    this.fetchSliders();
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

  fetchNewRelease() {
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
      'releasedate',
      false
    );
    this.movieService.getMoviesViewer(movieParam).subscribe({
      next: data => {
        console.log(data);
        this.newReleases = data.items;
      },
      error: err => {
        console.error(err)
      }
    });
  }

  fetchSliders() {
    const movieParam = new MovieParam(
      1,
      10,
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
        console.log(data);
        this.sliders = data.items;
      },
      error: err => {
        console.error(err)
      }
    });
  }
}
