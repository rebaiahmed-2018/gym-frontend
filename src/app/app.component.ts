import { Component, OnInit } from '@angular/core';
import { navItems } from './_nav';
import { LoginService } from './services/login.service';
import { AuthService } from './services/auth.service';
import { Member } from './models/member';
import { Subscription } from 'rxjs';
import { MemberService } from './services/member.service';
import { CoachService } from './services/coach.service';
import { AdminService } from './services/admin.service';
import { tokenGetter } from './token-getter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public memberChanged: Subscription;
  public coachChanged: Subscription;
  public adminChanged: Subscription;
  public user: any;
  public navItems = navItems;
  public element: HTMLElement = document.body;
  isAuthenticated: Boolean;
  constructor(private loginService: LoginService, private authService: AuthService, 
    private memberService: MemberService,
    private coachService: CoachService,
    private adminService: AdminService, private router: Router) {
  }
  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.memberChanged = this.memberService.memberChanged.subscribe(
      (member) => {
        this.user = member;
      }
    );
    this.coachChanged = this.coachService.coachChanged.subscribe(
      (coach) => {
        this.user = coach;
      }
    );
    this.adminChanged = this.adminService.adminChanged.subscribe(
      (admin) => {
        this.user = admin;
      }
    );
      this.getMember();
  }
  public logout() {
    console.log("I logged out");
    this.loginService.logout().subscribe();
    window.location.reload();
  }
  getRole(): string {
    return this.authService.getCurrentUserRole();
  }
  getMember() {
    let role: string = this.getRole();
    console.log(role)
    switch(role){
      case 'MEMBER': 
      this.memberService.findMemberByUsername(this.authService.getCurrentUser());
      break;
      case 'COACH': 
      this.coachService.findCoachByUsername(this.authService.getCurrentUser());
      break;
      case 'ADMINISTRATOR':
      this.adminService.findAdminByUsername(this.authService.getCurrentUser());
      break;
    }
    
  }
  openProfile() {
    localStorage.setItem('editUserId', tokenGetter()['user']);
    this.router.navigate(['/edit-user']);
  }
}
