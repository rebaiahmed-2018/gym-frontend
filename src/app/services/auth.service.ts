import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MemberService } from './member.service';
import { Member } from '../models/member';
import { Subscription } from 'rxjs';
import { tokenGetter } from '../token-getter';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}
  // ...
  public isAuthenticated(): boolean {
    if (localStorage.getItem('currentUser') == null)
    {
      return false;
    }
    const token = tokenGetter()['token'];
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
  public getCurrentUser(): string {
    return tokenGetter()['user'];
  }
  public getCurrentUserRole(): string {
    return tokenGetter()['role'];
  }
}