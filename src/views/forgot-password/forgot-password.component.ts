import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {RequestForgotPasswordDto} from "../../models/authDtos/requestForgotPasswordDto.model";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  requestForgotPassword : RequestForgotPasswordDto = new class implements RequestForgotPasswordDto {
    email: string = "";
  }

  constructor(private authService: AuthService) {
  }

  onSubmit() {
    this.authService.forgotPassword(this.requestForgotPassword);
  }
}
