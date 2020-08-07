import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomFormValidator } from 'src/app/shared/validators/custom-form.validator';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.css']
})
export class AddSubscriptionComponent implements OnInit {
  subscriptionForm: FormGroup;
  get form() {
    return this.subscriptionForm.controls;
  }
  constructor() { }

  ngOnInit(): void {
    this.SubscriptionFormInitialization();
  }

  private SubscriptionFormInitialization() {
    this.subscriptionForm = new FormGroup({
      title: new FormControl('',
        Validators.compose([Validators.required, CustomFormValidator.cannotContainSpace])),
      amount: new FormControl('',
        Validators.compose([Validators.required, CustomFormValidator.cannotContainSpace])),
      validity: new FormControl('',
        Validators.compose([Validators.required])),
    });
  }
}
