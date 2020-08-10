import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-subscription',
  templateUrl: './seller-subscription.component.html',
  styleUrls: ['./seller-subscription.component.css']
})
export class SellerSubscriptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
    }
  ngAfterViewInit() {

  this.loadScript('assets/js/datatable.js');
  }
}
