import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class roleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRoles: string[] = route.data['role'];

    const token = localStorage.getItem('token') ?? '';
    if (!token) {
      location.reload();
      return false;
    }

    const decodedToken = this.authService.parseJwt(token);
    const userRoles: string[] = decodedToken?.role;

    if (userRoles && !expectedRoles.some(role => userRoles.includes(role))) {
      console.log('Expected roles:', expectedRoles);
      console.log('User roles:', userRoles);
      return false;
    }

    return true;
  }
}
