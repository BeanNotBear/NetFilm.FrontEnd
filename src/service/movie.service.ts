import {Injectable} from '@angular/core';
import {NzUploadFile} from "ng-zorro-antd/upload";
import {ApiService} from "../api/api.service";
import {MovieResponseDto} from "../models/movieDtos/movie.response.dto";
import {MovieDto} from "../models/movieDtos/movie.dto";
import {MovieParam} from "../models/movieDtos/movie.param";
import {HttpParams} from "@angular/common/http";

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

  getMoviesViewer(movieParam: MovieParam) {
    let param = new HttpParams()
      .set("PageIndex", movieParam.pageIndex)
      .set("PageSize", movieParam.pageSize)
      .set("SearchTerm", movieParam.searchTerm);

    if(movieParam.status !== null) {
      param = param.set("Status", movieParam.status);
    }
    if(movieParam.quality !== null) {
      param = param.set("Quality", movieParam.quality);
    }
    if(movieParam.allowingAge !== null) {
      param = param.set("AllowingAge", movieParam.allowingAge);
    }
    if(movieParam.averageStar !== null) {
      param = param.set("AverageStar", movieParam.averageStar);
    }
    if(movieParam.country !== null) {
      param = param.set("Country", movieParam.country);
    }
    if(movieParam.category !== null) {
      param = param.set("Category", movieParam.category)
    }
    if(movieParam.participant !== null) {
      param = param.set("Participant", movieParam.participant)
    }
    if(movieParam.releaseDate !== null) {
      param = param.set("ReleaseDate", movieParam.releaseDate)
    }
    if(movieParam.includes !== null) {
      param = param.set("Includes", movieParam.includes)
    }
    if(movieParam.sortBy !== null) {
      param = param.set("SortBy", movieParam.sortBy)
    }
    if(movieParam.ascending !== null) {
      param = param.set("Ascending", movieParam.ascending)
    }
    return this.apiService.getMoviesViewer(param);
  }
}
