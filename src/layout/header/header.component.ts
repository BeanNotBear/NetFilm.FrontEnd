import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

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
export class HeaderComponent {
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
}
