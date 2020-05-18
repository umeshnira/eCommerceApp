import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-payment-method",
  templateUrl: "./payment-method.component.html",
  styleUrls: ["./payment-method.component.css"],
})
export class PaymentMethodComponent implements OnInit {
  savedCards: boolean = true;
  atmCard: boolean;
  netBanking: boolean;
  upi: boolean;
  constructor() {}

  ngOnInit(): void {}
  radioChange(value: string) {
    if (value == "atm") {
      this.atmCard = true;
      this.netBanking = false;
      this.savedCards = false;
      this.upi = false;
    } else if (value == "netBanking") {
      this.netBanking = true;
      this.atmCard = false;
      this.savedCards = false;
      this.upi = false;
    } else if (value == "upi") {
      this.upi = true;
      this.netBanking = false;
      this.atmCard = false;
      this.savedCards = false;
    } else {
      this.savedCards = true;
      this.netBanking = false;
      this.atmCard = false;
      this.upi = false;
    }
  }
}
