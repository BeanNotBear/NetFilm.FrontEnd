import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {PasswordUpdate} from "../../../models/userDtos/passwordUpdate.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;
  @Input({required: true}) id!: string;
  @Output() close = new EventEmitter<void>();
  @Output() submitPassword = new EventEmitter<{
    currentPassword: string;
    newPassword: string;
  }>();

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { passwordMismatch: true };
  }

  passwordUpdate: PasswordUpdate = new class implements PasswordUpdate {
    confirmNewPassword: string = "";
    newPassword: string = "";
    oldPassword: string = "";
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      this.submitPassword.emit({
        currentPassword: this.passwordForm.get('currentPassword')?.value,
        newPassword: this.passwordForm.get('newPassword')?.value
      });
      this.passwordUpdate.oldPassword = this.passwordForm.get('currentPassword')?.value;
      this.passwordUpdate.newPassword = this.passwordForm.get('newPassword')?.value;
      this.passwordUpdate.confirmNewPassword = this.passwordForm.get('confirmPassword')?.value;
      console.log(this.passwordUpdate);
      this.authService.updatePassword(this.id, this.passwordUpdate);
      this.onClose();
    }
  }

  onClose() {
    this.close.emit();
  }
}
