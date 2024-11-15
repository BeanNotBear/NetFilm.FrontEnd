import {Login} from "../models/authDtos/login.model";
import {ApiService} from "../api/api.service";
import {Injectable} from "@angular/core";
import {Register} from "../models/authDtos/register.model";
import Swal from 'sweetalert2';
import {VerifyEmail} from "../models/authDtos/verifyEmail.model";
import {ResendEmail} from "../models/authDtos/resendEmail.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private apiService: ApiService) {

  }

  isLoggedIn(): boolean {
    if (localStorage.getItem("token")) {
      let tokenData = this.parseJwt(localStorage.getItem("token") ?? "");
      const currentTime = Math.floor(Date.now() / 1000);
      if (tokenData.exp > currentTime) {
        return true;
      } else {
        this.logout();
        return false;
      }
    }
    return false;
  }

  login(login: Login) {
    let payload = {"userName": login.userName, "passWord": login.passWord}
    this.apiService.login(payload).subscribe(
      response => {
        localStorage.setItem("token", response.jwtToken);
        location.href = "home";
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

  logout() {
    localStorage.clear();
    location.reload()
  }

  getRoles() {
    const token = localStorage.getItem('token');
    const decodedToken = this.parseJwt(token ?? "");
    const userRole = decodedToken?.role;
    return userRole;
  }


  register(register: Register): Promise<boolean> {
    let payload: Register = register;

    return new Promise((resolve) => {
      this.apiService.register(payload).subscribe(
        response => {
          console.log(response);
          resolve(true);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to Register',
            text: 'An error occurred while register. Please try again later.',
            confirmButtonText: 'OK'
          });
          console.error('Error adding new walk', error);
          resolve(false);
        }
      );
    });
  }

  emailVerification(verifyEmail: VerifyEmail) {
    let payload: VerifyEmail = verifyEmail;
    this.apiService.verifyEmail(payload).subscribe(
      response => {
        location.href = "/login";
      },
      error => {
        console.log(error.message);
      }
    )
  }

  resendEmail(resendEmail: ResendEmail) {
    let payload: ResendEmail = resendEmail;
    this.apiService.resendEmail(resendEmail).subscribe();
  }

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}
