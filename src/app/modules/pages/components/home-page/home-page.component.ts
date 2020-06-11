import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscriptionLike as ISubscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit, OnDestroy {

  showHeaderFooter: boolean;
  subscription: ISubscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.navigate(['/pages/firstPage']);
    this.hideFooter();
  }

  ngOnDestroy() {

    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  }

  private hideFooter() {

    this.subscription = this.route.url.subscribe(dataUrl => {
      const path = dataUrl[0].parameters.path;
      if (path === 'auth/client/signUp' || path === 'auth/seller/signUp') {
        this.showHeaderFooter = false;
      } else {
        this.showHeaderFooter = true;
      }
    });
  }

}
