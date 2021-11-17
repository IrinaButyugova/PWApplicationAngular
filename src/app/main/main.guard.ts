import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { Paths } from '../paths';

@Injectable()
export class MainGuard implements CanActivate{

    constructor(
        private authService: AuthService,
        private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ) : Observable<boolean>{
        return this.authService.getAuth$().pipe(
            tap((canActivate) => {
                if (!canActivate) {
                    this.router.navigateByUrl(`/${Paths.Auth}`);
                  }
                })
            );
    }
}