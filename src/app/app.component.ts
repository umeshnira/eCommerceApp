import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  title = 'app';
  showFooter: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.hideFooter();
  }

  hideFooter() {

    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] === '/auth/client/signUp') {
          this.showFooter = false;
        } else if (event['url'] === '/auth/seller/signUp') {
          this.showFooter = false;
        } else {
          this.showFooter = true;
        }
      }
    });
  }
}
