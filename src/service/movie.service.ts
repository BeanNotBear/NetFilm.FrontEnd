import {Injectable} from '@angular/core';
import {NzUploadFile} from "ng-zorro-antd/upload";
import {ApiService} from "../api/api.service";
import {MovieResponseDto} from "../models/movieDtos/movie.response.dto";
import {MovieDto} from "../models/movieDtos/movie.dto";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private apiService: ApiService) {
  }

  uploadMovie(file: NzUploadFile) {
    let formData = new FormData();
    if (file instanceof File) {
      formData.append('file', file);
    }
    return this.apiService.uploadFile(formData, 'POST');
  }

  updateMovieDetails(movie: MovieResponseDto, file: NzUploadFile) {
    let categories = movie.categories.join(',');
    console.log(categories)
    let participants = movie.participants.map(x => x.id).join(',');
    console.log(participants)
    let movieRequest: MovieDto = new MovieDto(
      movie.name,
      movie.description,
      movie.quality,
      movie.allowing_Age,
      new Date(movie.release_Date).toISOString(),
      movie.duration,
      movie.country.id,
      categories,
      participants
    );
    console.log(movieRequest);
    return this.apiService.uploadMovieDetails(movie.id, movieRequest);
  }

  uploadPoster(file: NzUploadFile) {
    let formData = new FormData();
    if (file instanceof File) {
      formData.append('file', file);
    }
    return this.apiService.uploadFile(formData, 'POST');
  }
}
