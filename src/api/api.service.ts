import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PageResult} from "../models/common/pageResult.model";
import {delay, Observable} from "rxjs";
import {UserDto} from "../models/userDtos/userDto.model";
import {Role, RoleResponse} from "../models/roleDtos/role";
import {Login} from "../models/authDtos/login.model";
import {Register} from "../models/authDtos/register.model";
import {VerifyEmail} from "../models/authDtos/verifyEmail.model";
import {ResendEmail} from "../models/authDtos/resendEmail.model";

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

  login(login: Login): Observable<any> {
    return this.http.post<Login>(this.baseUrl + "/Auths/Login", login);
  }

  register(register: Register): Observable<any> {
    return this.http.post<Register>(this.baseUrl + "/Auths/Register", register);
  }

  verifyEmail(verifyEmail: VerifyEmail): Observable<any> {
    return this.http.post<VerifyEmail>('https://localhost:7027/api/Auths/EmailVerification', verifyEmail);
  }

  resendEmail(resendEmail: ResendEmail): Observable<any> {
    return this.http.post('https://localhost:7027/api/Auths/ResendEmail', resendEmail);
  }

}
