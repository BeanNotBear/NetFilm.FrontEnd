import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
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
export class HeaderComponent implements OnInit {

  @Output() isDashboard = new EventEmitter();

  private authService = inject(AuthService);

  LoggedIn: boolean = this.authService.isLoggedIn();

  roles!: string[];

  ngOnInit() {
    if(this.LoggedIn){
      this.roles = this.authService.getRoles();
    }
  }

  logoutBtn() {
    this.authService.logout();
  }

  onOpenDashboard() {
    this.isDashboard.emit();

  }
}
