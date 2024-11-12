import { Component } from '@angular/core';
import {RateComponent} from "../rate/rate.component";
import {DateService} from "../../service/date.service";
import {TabComponent} from "../tab/tab.component";
import {MovieSiderComponent} from "../movie-sider/movie-sider.component";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    RateComponent,
    TabComponent,
    MovieSiderComponent
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  formattedReleaseDate!: string;
  releaseDate = '08/29/2003';
  constructor(private dateService: DateService) {

  }
  formatReleaseDate():string {
    return this.dateService.formatDate(this.releaseDate);
  }
}
