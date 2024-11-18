import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { FormsModule } from "@angular/forms";
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from "primeng/inputtext";
import { CommonModule } from "@angular/common";
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import {AuthService} from "../../../service/auth.service";
import {VerifyEmail} from "../../../models/authDtos/verifyEmail.model";
import {ResendEmail} from "../../../models/authDtos/resendEmail.model";

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputOtpModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit, OnDestroy {
  timerActive: boolean = false;
  timeLeft: number = 30;
  resendLabel: string = 'Resend Code';
  verifying: boolean = false;
  private timerSubscription?: Subscription;

  @Input({required:true}) email!: string;

  verifyEmail: VerifyEmail = new class implements VerifyEmail {
    code: string = "";
    email: string = "";
  }

  resendEmail: ResendEmail = new class implements ResendEmail {
    email: string = "";
  }

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startTimer() {
    this.timerActive = true;
    this.timeLeft = 30;

    this.timerSubscription = interval(1000)
      .pipe(take(31))
      .subscribe(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.resendLabel = `Resend in ${this.timeLeft}s`;
        } else {
          this.timerActive = false;
          this.resendLabel = 'Resend Code';
        }
      });
  }

  handleResend() {
    if (!this.timerActive) {
      this.verifyEmail.code = '';
      this.startTimer();
    }
    this.resendEmail.email = this.email
    this.authService.resendEmail(this.resendEmail);
  }

  handleSubmit() {
    if (this.verifyEmail.code.length === 6) {
      this.verifying = true;
      setTimeout(() => {
        this.verifying = false;
        this.verifyEmail.email = this.email
        // console.log(this.email);
        // console.log('Submitted:', this.verifyEmail.code);
        console.log(this.verifyEmail);
        this.authService.emailVerification(this.verifyEmail);
      }, 0);
    }
  }

  getInputClass(token: string): string {
    return `otp-input ${token ? 'filled' : ''}`;
  }
}
