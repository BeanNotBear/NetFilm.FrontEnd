import { Component } from '@angular/core';
import {MovieAreaComponent} from "../movie-area/movie-area.component";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    MovieAreaComponent
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {

}
