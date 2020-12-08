import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './home/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckerGuard implements CanActivate {
  
  constructor(private auth:AuthService,private router:Router){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.auth.isLoggedIn()){
        this.router.navigateByUrl('home/login');
        return false
      }
    this.router.navigate['/dashboard']
    return true;
  }
  
}
