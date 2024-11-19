import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CategoryDto } from '../../models/categoryDtos/category.dto';
import { CountryDto } from '../../models/countryDtos/country.dto';
import { CategoryService } from '../../service/category.service';
import { CountryService } from '../../service/country.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  search!: string;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private countryService: CountryService
  ) {}

  onSearch() {
    if (this.search) {
      this.router.navigate(['/movies'], {
        queryParams: { search: this.search },
      });
    }
  }

  onFilterCategory(id: string) {
    this.router.navigate(['/movies'], {
      queryParams: { categoryId: id },
    });
  }

  onFilterCountry(id: string) {
    this.router.navigate(['/movies'], {
      queryParams: { countryId: id },
    });
  }

  @Output() isDashboard = new EventEmitter();

  private authService = inject(AuthService);

  LoggedIn: boolean = this.authService.isLoggedIn();

  categories: CategoryDto[] = [];
  countries: CountryDto[] = [];
  roles!: string[];

  ngOnInit() {
    this.fecthCategories();
    this.fecthCountries();
    if (this.LoggedIn) {
      this.roles = this.authService.getRoles();
    }
  }

  logoutBtn() {
    this.authService.logout();
  }

  onOpenDashboard() {
    this.isDashboard.emit();
  }

  fecthCategories() {
    this.categoryService.getCategories().subscribe((reponse) => {
      this.categories = reponse;
    });
  }

  fecthCountries() {
    this.countryService.getCountries().subscribe((reponse) => {
      this.countries = reponse;
    });
  }
}
