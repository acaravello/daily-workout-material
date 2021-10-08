import { Route } from "@angular/compiler/src/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";


export class AuthGuard implements CanActivate, CanLoad {

    userLogged = false;

    constructor(private authService: AuthService, private router:Router) {}

    canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot ) {
        this.userLogged = this.authService.isAuth();
        if(this.userLogged) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }

    canLoad(route: Route ) {
        this.userLogged = this.authService.isAuth();
        if(this.userLogged) {
            return true;
        } else { 
            this.router.navigate(['/login']);
        }
    }
}