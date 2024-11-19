import { Routes } from '@angular/router';
import { HomeComponent } from '../views/home/home.component';
import { UserAdminComponent } from '../views/user-admin/user-admin.component';
import { MovieDetailsComponent } from '../views/movie-details/movie-details.component';
import { MovieWatchingComponent } from '../views/movie-watching/movie-watching.component';
import { MovieListComponent } from '../views/movie-list/movie-list.component';
import { CategoryAdminComponent } from '../views/category-admin/category-admin.component';
import { CommentAdminComponent } from '../views/comment-admin/comment-admin.component';
import { AdvertiseAdminComponent } from '../views/advertise-admin/advertise-admin.component';
import { MovieAdminComponent } from '../views/movie-admin/movie-admin.component';
import { LoginComponent } from '../views/login/login.component';
import { RegisterComponent } from '../views/register/register.component';
import { authGuard } from '../guards/auth.guard';
import { denyGuard } from '../guards/deny.guard';
import { roleGuard } from '../guards/role.guard';
import { UserProfileComponent } from '../views/user-profile/user-profile.component';
import { ForgotPasswordComponent } from '../views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../views/reset-password/reset-password.component';

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
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'movie/:movieId/details',
    title: 'Movie Details',
    component: MovieDetailsComponent,
  },
  {
    path: 'movie/:movieId/watch',
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
    title: 'User Admin',
    component: UserAdminComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: ['ADMIN'],
    },
  },
  {
    path: 'movie-admin',
    title: 'Movie Management',
    component: MovieAdminComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: ['ADMIN']
    }
  },
  {
    path: 'login',
    title: ' Login',
    component: LoginComponent,
    canActivate: [denyGuard],
  },
  {
    path: 'register',
    title: ' Register',
    component: RegisterComponent,
    canActivate: [denyGuard],
  },
  {
    path: 'user-profile',
    title: ' User Profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'forgot-password',
    title: ' Forgot Password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    title: ' Reset Password',
    component: ResetPasswordComponent,
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
