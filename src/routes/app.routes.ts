import { Routes } from '@angular/router';
import { HomeComponent } from '../views/home/home.component';
import { UserAdminComponent } from '../views/user-admin/user-admin.component';
import { MovieDetailsComponent } from '../views/movie-details/movie-details.component';
import { MovieWatchingComponent } from '../views/movie-watching/movie-watching.component';
import { MovieListComponent } from '../views/movie-list/movie-list.component';
import { CategoryAdminComponent } from '../views/category-admin/category-admin.component';
import { CommentAdminComponent } from '../views/comment-admin/comment-admin.component';
import { AdvertiseAdminComponent } from '../views/advertise-admin/advertise-admin.component';

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
    path: 'movie/details',
    title: 'Movie Details',
    component: MovieDetailsComponent,
  },
  {
    path: 'movie/watch',
    title: 'Watch',
    component: MovieWatchingComponent,
  },
  {
    path: 'movies',
    title: 'Movies',
    component: MovieListComponent,
  },
  {
    path: 'user-admin',
    title: ' User Admin',
    component: UserAdminComponent,
  },
  {
    path: 'category-admin',
    title: 'Category Admin',
    component: CategoryAdminComponent,
  },
  {
    path: 'comment-admin',
    title: 'Comment Admin',
    component: CommentAdminComponent,
  },
  {
    path: 'advertise-admin',
    title: 'Advertise Admin',
    component: AdvertiseAdminComponent,
  },
];
