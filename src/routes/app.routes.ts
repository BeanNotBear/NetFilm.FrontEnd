import { Routes } from '@angular/router';
import {HomeComponent} from "../views/home/home.component";
import {MovieDetailsComponent} from "../views/movie-details/movie-details.component";

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
    // canActivate: [AuthGuard, RoleGuard],
    // data:{
    //   roles: ['customer', 'admin']
    // }
  },
  {
    path: 'movie/details',
    title: 'Movie Details',
    component: MovieDetailsComponent
  }
];
