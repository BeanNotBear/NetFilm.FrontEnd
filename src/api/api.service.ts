import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {PageResult} from "../models/common/pageResult.model";
import {delay, filter, map, Observable} from "rxjs";
import {UserDto} from "../models/userDtos/userDto.model";
import {Role, RoleResponse} from "../models/roleDtos/role";
import {MovieResponseDto} from "../models/movieDtos/movie.response.dto";
import {CountryDto} from "../models/countryDtos/country.dto";
import {ParticipantDto} from "../models/participantDtos/participant.dto";
import {CategoryDto} from "../models/categoryDtos/category.dto";
import {MovieDto} from "../models/movieDtos/movie.dto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "https://localhost:7027/api";

  constructor(private http: HttpClient) {
  }

  getUsersPagination(pageIndex: number, pageSize: number, searchTerm: string, sortBy: string, ascending: boolean) {
    return this.http.get<PageResult<UserDto>>('https://localhost:7027/api/Users/PageResult', {
      params: new HttpParams()
        .set('pageIndex', pageIndex)
        .set('pageSize', pageSize)
        .set('searchTerm', searchTerm)
        .set('sortBy', sortBy)
        .set('ascending', ascending)
    }).pipe(delay(0));
  }

  addRole(role: Role) {
    return this.http.post<RoleResponse>('https://localhost:7027/api/Roles', role).subscribe(
      {
        next: data => {
          console.log(data);
        },
        error: error => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      }
    );
  }

  // used to upload movie
  uploadFile(formData: FormData, method: string): Observable<MovieResponseDto> {
    const req = new HttpRequest(method, `${this.baseUrl}/Movies/Upload`, formData, {
      // reportProgress: true
    });

    return this.http.request(req).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
      map((response: HttpResponse<any>) => response.body as MovieResponseDto)
    );
  }

  uploadPoster(id: string, formData: FormData, method: string): Observable<MovieResponseDto> {
    const req = new HttpRequest(method, `${this.baseUrl}/${id}/Add/Poster`, formData, {
      // reportProgress: true
    });

    return this.http.request(req).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
      map((response: HttpResponse<any>) => response.body as MovieResponseDto)
    );
  }

  getCountries(): Observable<CountryDto[]> {
    const url = `${this.baseUrl}/Countries`;
    return this.http.get<CountryDto[]>(url);
  }

  getCategories(): Observable<CategoryDto[]> {
    const url = `${this.baseUrl}/Category`;
    return this.http.get<CategoryDto[]>(url);
  }

  getParticipants(): Observable<ParticipantDto[]> {
    const url = `${this.baseUrl}/Participants`;
    return this.http.get<ParticipantDto[]>(url);
  }

  uploadMovieDetails(id: string, movie: MovieDto): Observable<MovieResponseDto> {
    return this.http.put<MovieResponseDto>(`${this.baseUrl}/Movies/${id}/Add/Details`, movie);
  }

  uploadSubtitle(id: string, formData: FormData, method: string): Observable<MovieResponseDto> {
    const req = new HttpRequest(method, `${this.baseUrl}/Subtitles/Upload`, formData, {
      // reportProgress: true
    });

    return this.http.request(req).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
      map((response: HttpResponse<any>) => response.body as MovieResponseDto)
    );
  }
}
