import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-transactions',
  templateUrl: './sales-transactions.component.html',
  styleUrls: ['./sales-transactions.component.css']
})
export class SalesTransactionsComponent implements OnInit {

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
