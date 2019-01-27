import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard {}

// export class AuthGuard implements CanActivate {
//     constructor(private authService: AuthService, private router: Router) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         if (this.authService.isAuth()) {
//             return true;
//         } else {
//         this.router.navigate(['/login']);
//         }
//     }
// }
