import {Routes} from '@angular/router';
import {HomeComponent} from "../views/home/home.component";
import {UserAdminComponent} from "../views/user-admin/user-admin.component";

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
    path: 'user-admin',
    title: ' User Admin',
    component: UserAdminComponent,
  }
];
