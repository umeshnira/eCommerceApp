import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  emailPattern = /^[_A-Za-z0-9]+(\.[_A-Za-z0-9]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,4})$/;
  formSubmitted: boolean;

  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.validateForm();
  }

  validateForm() {

    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl(''),
      landmark: new FormControl(''),
      pincode: new FormControl(''),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])),
      phone: new FormControl(''),
      password: new FormControl('', Validators.compose([Validators.required]))

    });
  }

  submitForm(signUpForm: FormGroup) {
    this.formSubmitted = true;
    if (signUpForm.valid) {

      const model = {
        sellerName: signUpForm.value.name,
        address: signUpForm.value.address,
        landmark: signUpForm.value.landmark,
        pincode: signUpForm.value.pincode,
        email: signUpForm.value.email,
        phone: signUpForm.value.phone,
        password: signUpForm.value.password,
        role: 'Seller'
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
