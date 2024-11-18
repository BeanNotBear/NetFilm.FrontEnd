import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import {OtpComponent} from "./otp/otp.component";
import {Register} from "../../models/authDtos/register.model";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    RouterLink,
    OtpComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private authService: AuthService) {
  }

  isPasswordVisible: boolean = false; // Track visibility state
  isRegister: boolean = false;

  register: Register = new class implements Register {
    dateOfBirth: Date = new Date();
    email: string = '';
    firstName: string = '';
    lastName: string = '';
    passWord: string = '';
    phoneNumber: string = '';
    userName: string = '';
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async onSubmit() {
    const result = await this.authService.register(this.register);
    if(result === true){
      this.isRegister = true;
    }
  }
}
