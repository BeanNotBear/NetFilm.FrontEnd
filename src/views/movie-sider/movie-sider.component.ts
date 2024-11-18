import {Component, Input} from '@angular/core';
import {MovieViewerDto} from "../../models/movieDtos/movie.viewer.dto";

@Component({
  selector: 'app-movie-sider',
  standalone: true,
  imports: [],
  templateUrl: './movie-sider.component.html',
  styleUrl: './movie-sider.component.scss'
})
export class MovieSiderComponent {
  @Input() movies!: MovieViewerDto[];

  getYearRelease(date: string) {
    let year = new Date(date).getFullYear();
    return year;
  }
}
