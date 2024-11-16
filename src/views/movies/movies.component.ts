import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MovieComponent} from "../movie/movie.component";
import {MovieViewerDto} from "../../models/movieDtos/movie.viewer.dto";

export interface Movie {
  id: number;
  imageUrl: string
}

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

  @Input() movies: MovieViewerDto[] = [];

  // movies: Movie[] = [
  //   {id: 1, title: 'Arcane', imageUrl: 'https://m.media-amazon.com/images/M/MV5BOWJhYjdjNWEtMWFmNC00ZjNkLThlZGEtN2NkM2U3NTVmMjZkXkEyXkFqcGc@._V1_.jpg'},
  //   {id: 2, title: 'Mai', imageUrl: 'https://www.elle.vn/wp-content/uploads/2023/12/06/560540/poster-Mai-scaled.jpg'},
  //   {id: 3, title: 'Gia Tai Cua Ngoai', imageUrl: 'https://www.elle.vn/wp-content/uploads/2024/05/10/586293/poster-gia-tai-cua-ngoai.jpg'},
  //   {id: 4, title: 'See You', imageUrl: 'https://image.tmdb.org/t/p/original/aPcKGveBvsygdEd6d80oxa23unF.jpg'},
  //   {id: 5, title: 'Dat Rung Phuong Nam', imageUrl: 'https://cdn.tuoitre.vn/471584752817336320/2023/8/1/1-1690868911564188361819.jpg'},
  //   {id: 6, title: 'Venom', imageUrl: 'https://upload.wikimedia.org/wikipedia/vi/a/a4/Venom_phim_nam_2018.jpg'},
  // ];
}
