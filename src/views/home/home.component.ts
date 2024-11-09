import { Component } from '@angular/core';
import {SliderComponent} from "../slider/slider.component";
import {MoviesComponent} from "../movies/movies.component";
import {MovieAreaComponent} from "../movie-area/movie-area.component";
import {DialogComponent} from "../dialog/dialog.component";

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
export class HomeComponent {

}
