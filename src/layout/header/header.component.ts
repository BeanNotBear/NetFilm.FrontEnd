import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private authService = inject(AuthService);

  LoggedIn: boolean = this.authService.isLoggedIn();

  logoutBtn() {
    this.authService.logout();
  }
}
