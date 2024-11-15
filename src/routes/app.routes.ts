import {Routes} from '@angular/router';
import {HomeComponent} from "../views/home/home.component";
import {UserAdminComponent} from "../views/user-admin/user-admin.component";
import {MovieDetailsComponent} from "../views/movie-details/movie-details.component";
import {MovieWatchingComponent} from "../views/movie-watching/movie-watching.component";
import {MovieListComponent} from "../views/movie-list/movie-list.component";
import {LoginComponent} from "../views/login/login.component";
import {RegisterComponent} from "../views/register/register.component";
import {authGuard} from "../guards/auth.guard";
import {denyGuard} from "../guards/deny.guard";
import {roleGuard} from "../guards/role.guard";

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
    // canActivate: [AuthGuard, RoleGuard],
    // data:{
    //   roles: ['customer', 'admin']
    // }
  },
  {
    path: '',
    title: 'Home',
    component: HomeComponent
  },
  {
    path: 'movie/details',
    title: 'Movie Details',
    component: MovieDetailsComponent
  },
  {
    path: 'movie/watch',
    title: 'Watch',
    component: MovieWatchingComponent
  },
  {
    path: 'movies',
    title: 'Movies',
    component: MovieListComponent
  },
  {
    path: 'user-admin',
    title: ' User Admin',
    component: UserAdminComponent,
    canActivate: [authGuard, roleGuard],
    data:{
      role: ['ADMIN']
    }
  },
  {
    path: 'login',
    title: ' Login',
    component: LoginComponent,
    canActivate: [denyGuard]
  },
  {
    path: 'register',
    title: ' Register',
    component: RegisterComponent,
    canActivate: [denyGuard]
  }
];
