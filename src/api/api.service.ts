import { Injectable } from '@angular/core';
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
import {MovieViewerDto} from "../models/movieDtos/movie.viewer.dto";
import {MovieManageDto} from "../models/movieDtos/movie.manage.dto";
import {Login} from "../models/authDtos/login.model";
import {Register} from "../models/authDtos/register.model";
import {VerifyEmail} from "../models/authDtos/verifyEmail.model";
import {ResendEmail} from "../models/authDtos/resendEmail.model";
import {UpdateUserRequestDto} from "../models/userDtos/updateUserRequestDto.model";
import {PasswordUpdate} from "../models/userDtos/passwordUpdate.model";
import {RequestForgotPasswordDto} from "../models/authDtos/requestForgotPasswordDto.model";
import {ResetPasswordRequestDto} from "../models/authDtos/resetPasswordRequestDto";
import {MovieUpdateDetails} from "../models/movieDtos/movie.update.details";
import {AddUser} from "../models/userDtos/addUser.model";
import {UpdateUser} from "../models/userDtos/updateUser.model";
import { CommentDto } from '../models/commentDtos/commentDto.model';
import { AdvertiseDto } from '../models/advertiseDtos/advertiseDto.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = "https://localhost:7027/api";
  private headers = {'Authorization' : `Bearer ${localStorage.getItem("token")}`};

  constructor(private http: HttpClient) {

  }

  getUsersPagination(
    pageIndex: number,
    pageSize: number,
    searchTerm: string,
    sortBy: string,
    ascending: boolean
  ) {
    return this.http
      .get<PageResult<UserDto>>(
        `${this.baseUrl}/Users/PageResult`,
        {
          params: new HttpParams()
            .set('pageIndex', pageIndex)
            .set('pageSize', pageSize)
            .set('searchTerm', searchTerm)
            .set('sortBy', sortBy)
            .set('ascending', ascending),
        }
      )
      .pipe(delay(0));
  }

  getCategoriesPagination(
    pageIndex: number,
    pageSize: number,
    searchTerm: string,
    sortBy: string,
    ascending: boolean
  ) {
    return this.http
      .get<PageResult<CategoryDto>>(this.baseUrl + '/Category/PageResult', {
        params: new HttpParams()
          .set('pageIndex', pageIndex)
          .set('pageSize', pageSize)
          .set('searchTerm', searchTerm)
          .set('sortBy', sortBy)
          .set('ascending', ascending),
      })
      .pipe(delay(0));
  }

  addCategory(data: any) {
    return this.http.post<any>(this.baseUrl + '/Category', data);
  }

  updateCategory(categoryId: string, data: any) {
    return this.http.put<any>(this.baseUrl + '/Category/' + categoryId, data);
  }
  addComment(data: any) {
    return this.http.post<any>(this.baseUrl + '/Comment', data);
  }

  getCommentByMovieId(movieId: string) {
    return this.http.get<any>(this.baseUrl + '/Comment/movie/' + movieId);
  }

  reply(data: any) {
    return this.http.post<any>(this.baseUrl + '/Comment/reply', data);
  }

  getReplyByCommentId(commentId: string) {
    return this.http.get<any>(this.baseUrl + '/Comment/reply/' + commentId);
  }

  updateComment(commentId: string, data: any) {
    return this.http.put<any>(this.baseUrl + '/Comment/' + commentId, data);
  }

  getCommentsPagination(
    pageIndex: number,
    pageSize: number,
    searchTerm: string,
    sortBy: string,
    ascending: boolean
  ) {
    return this.http
      .get<PageResult<CommentDto>>(this.baseUrl + '/Comment/PageResult', {
        params: new HttpParams()
          .set('pageIndex', pageIndex)
          .set('pageSize', pageSize)
          .set('searchTerm', searchTerm)
          .set('sortBy', sortBy)
          .set('ascending', ascending),
      })
      .pipe(delay(0));
  }

  deleteComment(commentId: string) {
    return this.http.patch<any>(this.baseUrl + '/Comment/' + commentId, null);
  }

  getAdvertisesPagination(
    pageIndex: number,
    pageSize: number,
    searchTerm: string,
    sortBy: string,
    ascending: boolean
  ) {
    return this.http
      .get<PageResult<AdvertiseDto>>(this.baseUrl + '/Advertise/PageResult', {
        params: new HttpParams()
          .set('pageIndex', pageIndex)
          .set('pageSize', pageSize)
          .set('searchTerm', searchTerm)
          .set('sortBy', sortBy)
          .set('ascending', ascending),
      })
      .pipe(delay(0));
  }

  getRandomAdvertise() {
    return this.http.get<any>(this.baseUrl + '/Advertise/Random');
  }

  addAdvertise(data: any) {
    return this.http.post<any>(this.baseUrl + '/Advertise', data);
  }

  updateAdvertise(advertiseId: string, data: any) {
    return this.http.put<any>(this.baseUrl + '/Advertise/' + advertiseId, data);
  }

  deleteAdvertise(advertiseId: string) {
    return this.http.delete<any>(this.baseUrl + '/Advertise/' + advertiseId);
  }

  addRole(role: Role) {
    return this.http
      .post<RoleResponse>('https://localhost:7027/api/Roles', role)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }

  // used to upload movie
  uploadFile(formData: FormData, method: string): Observable<MovieResponseDto> {
    const req = new HttpRequest(method, `${this.baseUrl}/Movies/Upload`, formData, {
      headers: new HttpHeaders(this.headers)
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
    return this.http.put<MovieResponseDto>(`${this.baseUrl}/Movies/${id}/Add/Details`, movie, {
      headers: new HttpHeaders(this.headers)
    });
  }

  uploadSubtitle(id: string, formData: FormData, method: string): Observable<MovieResponseDto> {
    const req = new HttpRequest(method, `${this.baseUrl}/Subtitles/Upload`, formData, {
      headers: new HttpHeaders(this.headers)
    });

    return this.http.request(req).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
      map((response: HttpResponse<any>) => response.body as MovieResponseDto)
    );
  }

  getMoviesViewer(httpParam: HttpParams) {
    return this.http.get<PageResult<MovieViewerDto>>(
      `${this.baseUrl}/Movies/spec`,
      {
        params: httpParam,
      }
    );
  }

  getMoviesManagement(httpParam: HttpParams) {
    return this.http.get<PageResult<MovieManageDto>>(`${this.baseUrl}/Movies/admin/spec`, {
      params: httpParam,
      headers: new HttpHeaders(this.headers)
    });
  }

  getMovieDetails(id: string) {
    return this.http.get<MovieResponseDto>(`${this.baseUrl}/Movies/${id}`);
  }

  addView(id: string) {
    return this.http.patch<MovieResponseDto>(
      `${this.baseUrl}/Movies/${id}/view`,
      {}
    );
  }

  updateMovieInformation(id: string, movie: MovieUpdateDetails) {
    return this.http.patch<MovieResponseDto>(`${this.baseUrl}/Movies/${id}/update/information`, movie, {
      headers: new HttpHeaders(this.headers)
    })
  }

  uploadPoster(id: string, formData: FormData): Observable<MovieResponseDto> {
    const req = new HttpRequest('PATCH', `${this.baseUrl}/Movies/${id}/update/poster`, formData, {
      headers: new HttpHeaders(this.headers)
    });

    return this.http.request(req).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
      map((response: HttpResponse<any>) => response.body as MovieResponseDto)
    );
  }

  deleteSubtitle(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/Subtitles/${id}`, {
      headers: new HttpHeaders(this.headers)
    });
  }

  login(login: Login): Observable<any> {
    return this.http.post<Login>(this.baseUrl + '/Auths/Login', login);
  }

  register(register: Register): Observable<any> {
    return this.http.post<Register>(this.baseUrl + '/Auths/Register', register);
  }

  verifyEmail(verifyEmail: VerifyEmail): Observable<any> {
    return this.http.post<VerifyEmail>(
      'https://localhost:7027/api/Auths/EmailVerification',
      verifyEmail
    );
  }

  resendEmail(resendEmail: ResendEmail): Observable<any> {
    return this.http.post(
      'https://localhost:7027/api/Auths/ResendEmail',
      resendEmail
    );
  }

  getUserByEmail(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.get(`https://localhost:7027/api/Users/Email`, { params });
  }

  updateUser(
    id: string,
    updateUserRequestDto: UpdateUserRequestDto
  ): Observable<any> {
    return this.http.put(`${this.baseUrl}/Users/${id}`, updateUserRequestDto);
  }

  updatePassword(id: string, passwordUpdate: PasswordUpdate): Observable<any> {
    const url = `${this.baseUrl}/Users/${id}/UpdatePassword`;
    return this.http.patch(url, passwordUpdate);
  }

  forgotPassword(
    requestForgotPasswordDto: RequestForgotPasswordDto
  ): Observable<any> {
    const url = `${this.baseUrl}/Auths/ForgotPassword`;
    return this.http.post(url, requestForgotPasswordDto);
  }

  resetPassword(
    resetPasswordRequestDto: ResetPasswordRequestDto
  ): Observable<any> {
    const url = `${this.baseUrl}/Auths/ResetPassword`;
    return this.http.post(url, resetPasswordRequestDto);
  }

  createUser(addUserRequestDto: AddUser): Observable<UserDto> {
    const url = `${this.baseUrl}/Users`;
    return this.http.post<UserDto>(url, addUserRequestDto);
  }

  getUserById(id: string): Observable<any> {
    const url = `${this.baseUrl}/Users/${id}`;
    return this.http.get(url);
  }

  updateUserAdmin(id: string, updateUserRequestDto: UpdateUser): Observable<any> {
    const url = `${this.baseUrl}/Users/${id}`;
    return this.http.put(url, updateUserRequestDto);
  }
}
