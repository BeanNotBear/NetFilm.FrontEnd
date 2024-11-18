import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {ChangePasswordComponent} from "./change-password/change-password.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    FormsModule,
    ChangePasswordComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  userEmail: string = "";
  isChangePassword: boolean = false;
  updateId: string = "";
  user: any;

  constructor(private authService: AuthService) {
    const token = localStorage.getItem('token') ?? '';

    const decodedToken = this.authService.parseJwt(token);

    this.userEmail = decodedToken?.email;
  }

  getUser(email: string) {
    this.authService.getUserByEmail(email).subscribe({
      next: (data) => {
        console.log('User data:', data);
        this.user = data;
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }

  ngOnInit() {
    this.getUser(this.userEmail)
  }

  onSubmit() {
    this.authService.updateUser(this.user.id, this.user);
  }

  onStartChangePassword(id: string) {
    this.isChangePassword = true;
    this.updateId = id;
  }

  onCloseChangePassword() {
    this.isChangePassword = false;
  }
}
