import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MemberService } from 'src/app/services/member.service';
import { CoachService } from 'src/app/services/coach.service';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/models/admin';
import { Member } from 'src/app/models/member';
import { Coach } from 'src/app/models/coach';
import { RolesEnum } from 'src/app/utils/roles-enum.enum';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  adminChangedSubscription: Subscription;
  memberChangedSubscription: Subscription;
  coachChangedSubscription: Subscription;
  user: any;
  validName = false;
  validLastName = false;
  validBday = false;
  validUsername = false;
  validEmail = false;
  validPassword = false;
  validCPassword = false;
  
  roles = ['admin', 'coach', 'member'];
  constructor(private router: Router, private memberService: MemberService, private coachService: CoachService, private adminService: AdminService, private loginService: LoginService) { }
  registerData = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    dateNaissance: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    password: new FormControl(''),
    Cpassword: new FormControl(''),
  });
  ngOnInit() {
    this.adminChangedSubscription = this.adminService.adminChanged.subscribe(
      (admin) => {
        this.user = admin;
      }
    );
    this.coachChangedSubscription = this.coachService.coachChanged.subscribe(
      (coach) => {
        this.user = coach;
      }
    );
    this.memberChangedSubscription = this.memberService.memberChanged.subscribe(
      (member) => {
        this.user = member;
      }
    );
  }
  onSubmit () {
    if (!(this.validBday && this.validCPassword && this.validEmail && this.validLastName && this.validName
      && this.validPassword && this.validUsername))
    {
      switch (this.registerData.value.role) {
      case ('admin') :
          const admin = new Admin(this.registerData.value.name,
          this.registerData.value.lastName,
          this.registerData.value.dateNaissance,
          this.registerData.value.email,
          this.registerData.value.username,
          this.registerData.value.password,
          Array<RolesEnum>(RolesEnum.ADMINISTRATOR));
          this.adminService.addAdmin(admin);
          break;
      case ('member'):
          const member = new Member(this.registerData.value.name,
          this.registerData.value.lastName,
          this.registerData.value.dateNaissance,
          this.registerData.value.email,
          this.registerData.value.username,
          this.registerData.value.password,
          Array<RolesEnum>(RolesEnum.MEMBER));
          this.memberService.addMember(member);
          break;
      case ('coach'):
          const coach = new Coach(this.registerData.value.name,
          this.registerData.value.lastName,
          this.registerData.value.dateNaissance,
          this.registerData.value.email,
          this.registerData.value.username,
          this.registerData.value.password,
          Array<RolesEnum>(RolesEnum.COACH));
          this.coachService.addCoach(coach);
          break;
    };
    alert("User added successfully");
    this.loginService.login(this.registerData.value.username, this.registerData.value.password)
    .subscribe(data => {
        this.router.navigateByUrl('');
        window.location.reload();
      });
    }
    else {
      alert("Something went wrong");
    }
  }
  vCPassword() {
    this.validCPassword = !(this.registerData.value.password === this.registerData.value.Cpassword);
  }
  vPassword() {
    this.validPassword = !(this.registerData.value.password.length > 5);
  }
  vEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log ('test : ' + re.test(String(this.registerData.value.email).toLowerCase()))
    this.validEmail = ! re.test(String(this.registerData.value.email).toLowerCase());
  }
  vName() {
    this.validName =  !(this.registerData.value.name.length > 2);
  }
  vLName() {
    this.validLastName =  !(this.registerData.value.lastName.length > 2);
  }
  vUsername() {
    this.validUsername =  (this.registerData.value.username.length < 6);
  }
  vBDay() {
    this.validBday = ! (this.registerData.value.dateNaissance);
  }
}
