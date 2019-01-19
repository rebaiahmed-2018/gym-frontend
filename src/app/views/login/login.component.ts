import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  constructor(private loginService: LoginService, private route: ActivatedRoute,
    private router: Router) { }
    loading = false;
    isLoggedIn = false;
    returnUrl: string;
    loginData = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onSubmit() {
    this.loginService.login(this.loginData.get("username").value,
                            this.loginData.get("password").value)
                            .subscribe(data => {
                              this.loading = false;
                              this.isLoggedIn = true;
                              // this.router.navigateByUrl(this.returnUrl);
                              this.router.navigate(['/home']);
                              window.location.reload();
                            },
                            error => {
                              this.loading = true;
                            });
  }

}
