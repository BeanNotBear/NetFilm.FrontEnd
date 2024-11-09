import { Routes } from '@angular/router';
import {HomeComponent} from "../views/home/home.component";

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
];
