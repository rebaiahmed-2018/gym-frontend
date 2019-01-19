import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { Router, ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { decode } from "jwt-decode";
import { tokenGetter } from '../token-getter';
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const role = tokenGetter()["role"];
    // decode the token to get its payload
    console.log(role);

    if (
      !this.auth.isAuthenticated() || 
      role !== expectedRole
    ) {
      alert("You are not authorized to access this section\nOnly " + expectedRole);
      // this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
