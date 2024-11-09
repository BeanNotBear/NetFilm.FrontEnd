import { Component } from '@angular/core';
import {SliderComponent} from "../slider/slider.component";
import {MoviesComponent} from "../movies/movies.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SliderComponent,
    MoviesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
