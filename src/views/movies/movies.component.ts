import { Component } from '@angular/core';
import {MovieComponent} from "../movie/movie.component";

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

}
