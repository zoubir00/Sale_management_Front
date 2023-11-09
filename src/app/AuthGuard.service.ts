import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot,Router,UrlTree } from '@angular/router';
import {Observable }from 'rxjs';
import { AuthService } from '@abp/ng.core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

constructor(private authService: AuthService, private router: Router) { }


CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ):Observable<boolean | UrlTree>| Promise<boolean | UrlTree> | boolean | UrlTree => {
    if(this.authService.isAuthenticated){
      return true;
    }else{
      return this.router.createUrlTree(['/account']);
    }
}
}
