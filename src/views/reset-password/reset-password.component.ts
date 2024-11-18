import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {ResetPasswordRequestDto} from "../../models/authDtos/resetPasswordRequestDto";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  isPasswordVisible: boolean = false; // Track visibility state

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  isPasswordVisible2: boolean = false; // Track visibility state

  togglePasswordVisibility2(): void {
    this.isPasswordVisible2= !this.isPasswordVisible2;
  }

  token: string | null = null;
  email: string | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.token = params.get('token');
      this.email = params.get('email');

      // Optional: Log the values to verify they are being captured
      console.log('Token:', this.token?.replace(/ /g, '+'));
      console.log('Email:', this.email);
    });
  }

  resetPasswordRequestDto: ResetPasswordRequestDto = new class implements ResetPasswordRequestDto {
    confirmPassword: string = "";
    email: string = "";
    password: string = "";
    token: string = "";
  }

  onSubmit() {
    if (this.token != null) {
      this.resetPasswordRequestDto.token = this.token.replace(/ /g, '+');
    }
    if (this.email != null) {
      this.resetPasswordRequestDto.email = this.email;
    }
    console.log(this.resetPasswordRequestDto);
    this.authService.resetPassword(this.resetPasswordRequestDto);
  }
}
