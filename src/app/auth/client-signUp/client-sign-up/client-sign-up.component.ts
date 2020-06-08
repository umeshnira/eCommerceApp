import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { isRegExp } from 'util';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-client-sign-up',
  templateUrl: './client-sign-up.component.html',
  styleUrls: ['./client-sign-up.component.css']
})
export class ClientSignUpComponent implements OnInit {

  signUpForm: FormGroup;
  formSubmitted = false;
  validationPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;
  username: any;
  password: any;

  constructor( 
    private service : AuthService
  ) { }

  ngOnInit(): void {
    this.validateForm();
  }

  validateForm() {

    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.validationPattern)])),
      password: new FormControl('', Validators.compose([Validators.required])),

    });
  }

  submitForm(signUpForm: FormGroup) {
    this.formSubmitted = true;
    if (signUpForm.valid) {

      const model = {
        userName: signUpForm.value.username,
        password: signUpForm.value.password,
        role: 'Client'
      }
      this.service.register(model).subscribe((response) => {

        if (response) {
          signUpForm.reset();
        }
      },
        (error) => {
          console.log(error);
        });
    }
  }

  get form() {

    return this.signUpForm.controls;
  }

}
