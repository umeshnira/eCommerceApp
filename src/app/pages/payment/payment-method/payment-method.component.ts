import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-payment-method",
  templateUrl: "./payment-method.component.html",
  styleUrls: ["./payment-method.component.css"],
})
export class PaymentMethodComponent implements OnInit {
  savedCards: boolean;
  atmCard: boolean;
  netBanking: boolean;
  upi: boolean;
  constructor() {}

  ngOnInit(): void {}
  radioChange(value:string){

  }
}
