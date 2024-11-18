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
import {UpdateUserRequestDto} from "../models/userDtos/updateUserRequestDto.model";
import {PasswordUpdate} from "../models/userDtos/passwordUpdate.model";
import {RequestForgotPasswordDto} from "../models/authDtos/requestForgotPasswordDto.model";
import {ResetPasswordRequestDto} from "../models/authDtos/resetPasswordRequestDto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "https://localhost:7027/api";

  private headers = {'Authorization' : `Bearer ${localStorage.getItem("token")}`};

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

  getUserByEmail(email: string) : Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.get(`https://localhost:7027/api/Users/Email`, { params });
  }

  updateUser(id: string, updateUserRequestDto: UpdateUserRequestDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/Users/${id}`, updateUserRequestDto);
  }

  updatePassword(id: string, passwordUpdate: PasswordUpdate): Observable<any> {
    const url = `${this.baseUrl}/Users/${id}/UpdatePassword`;
    return this.http.patch(url, passwordUpdate);
  }

  forgotPassword(requestForgotPasswordDto: RequestForgotPasswordDto): Observable<any> {
    const url = `${this.baseUrl}/Auths/ForgotPassword`;
    return this.http.post(url, requestForgotPasswordDto);
  }

  resetPassword(resetPasswordRequestDto: ResetPasswordRequestDto): Observable<any> {
    const url = `${this.baseUrl}/Auths/ResetPassword`;
    return this.http.post(url, resetPasswordRequestDto);
  }
}
