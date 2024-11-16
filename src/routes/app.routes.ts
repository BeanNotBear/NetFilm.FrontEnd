import {Routes} from '@angular/router';
import {HomeComponent} from "../views/home/home.component";
import {UserAdminComponent} from "../views/user-admin/user-admin.component";
import {MovieDetailsComponent} from "../views/movie-details/movie-details.component";
import {MovieWatchingComponent} from "../views/movie-watching/movie-watching.component";
import {MovieListComponent} from "../views/movie-list/movie-list.component";
import {MovieAdminComponent} from "../views/movie-admin/movie-admin.component";

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
    path: 'movie/:movieId/details',
    title: 'Movie Details',
    component: MovieDetailsComponent
  },
  {
    path: 'movie/:movieId/watch',
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
    title: 'User Admin',
    component: UserAdminComponent,
  },
  {
    path: 'movie-admin',
    title: 'Movie Management',
    component: MovieAdminComponent
  }
];
