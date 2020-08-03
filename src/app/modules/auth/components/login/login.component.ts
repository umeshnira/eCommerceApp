import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginModel } from '../../models/login.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { Constants } from 'src/app/shared/models/constants';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  formSubmitted: boolean;
  loginForm: FormGroup;
  loginSubscription: ISubscription;

  get form() {
    return this.loginForm.controls;
  }

  constructor(
    private service: LoginService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginFormInitialization();
  }

  submitLoginForm() {
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      const loginModel = new LoginModel();
      loginModel.user_name = this.loginForm.controls['username'].value;
      loginModel.password = this.loginForm.controls['password'].value;

      this.loginSubscription = this.service.login(loginModel).subscribe((response) => {

        if (response) {
          this.authService.setUserDetailsInCookie(response);
          if (response.role === Constants.client) {
            this.router.navigate([RoutePathConfig.Home]);
          } else {
            this.router.navigate([RoutePathConfig.Dashboard]);
          }
          if (response.role === Constants.admin) {
            this.router.navigate([RoutePathConfig.Dashboard]);
          } 
          this.formSubmitted = false;
          this.loginForm.reset();
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
    }
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  private loginFormInitialization() {
    this.loginForm = new FormGroup({
      username: new FormControl('',
        Validators.compose([Validators.required,
        Validators.pattern(Constants.validationPattern)])),
      password: new FormControl('',
        Validators.compose([Validators.required])),
    });
  }
}
