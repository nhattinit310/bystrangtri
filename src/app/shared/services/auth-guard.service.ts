import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, 
      private jwtService: JwtService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (this.jwtService.getToken()) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
