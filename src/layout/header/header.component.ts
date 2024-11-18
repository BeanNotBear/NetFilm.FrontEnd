import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  search!: string;

  constructor(private router: Router) {
  }

  onSearch() {
    if(this.search) {
      this.router.navigate(['/movies'], {
        queryParams: {search: this.search}
      });
    }
  }

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
