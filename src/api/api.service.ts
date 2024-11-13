import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageResult } from '../models/common/pageResult.model';
import { delay } from 'rxjs';
import { UserDto } from '../models/userDtos/userDto.model';
import { Role, RoleResponse } from '../models/roleDtos/role';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:44348/api';

  constructor(private http: HttpClient) {}

  getUsersPagination(
    pageIndex: number,
    pageSize: number,
    searchTerm: string,
    sortBy: string,
    ascending: boolean
  ) {
    return this.http
      .get<PageResult<UserDto>>('https://localhost:7027/api/Users/PageResult', {
        params: new HttpParams()
          .set('pageIndex', pageIndex)
          .set('pageSize', pageSize)
          .set('searchTerm', searchTerm)
          .set('sortBy', sortBy)
          .set('ascending', ascending),
      })
      .pipe(delay(0));
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
}
