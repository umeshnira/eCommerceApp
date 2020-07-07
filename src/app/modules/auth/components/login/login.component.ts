import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginModel } from '../../models/login.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { Constants } from 'src/app/shared/models/constants';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  formSubmitted: boolean;
  loginForm: FormGroup;
  loginSubscription: ISubscription;

  constructor(
    private service: LoginService,
    private cryptoService: EncryptDecryptService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.formInitialization();
  }

  submitForm() {

    this.formSubmitted = true;

    if (this.loginForm.valid) {

      const loginModel = new LoginModel();
      loginModel.user_name = this.loginForm.controls['username'].value;
      // loginModel.password = this.loginForm.controls['password'].value;
      const password = this.loginForm.controls['password'].value;
      loginModel.password = this.cryptoService.set('123456$#@$^@1ERF', password);
      this.loginSubscription = this.service.login(loginModel).subscribe((response) => {

        if (response) {
          this.formSubmitted = false;
          this.loginForm.reset();
          this.router.navigate(['home']);
        }
      },
        (error) => {
          console.log(error);
        });
    }
  }

  get form() {

    return this.loginForm.controls;
  }

  ngOnDestroy() {

    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  private formInitialization() {

    this.loginForm = new FormGroup({
      username: new FormControl('',
        Validators.compose([Validators.required,
        Validators.pattern(Constants.validationPattern)])),
      password: new FormControl('',
        Validators.compose([Validators.required])),
    });
  }

}
