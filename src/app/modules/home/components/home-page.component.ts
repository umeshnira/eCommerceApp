import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscriptionLike as ISubscription, VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  subscription: ISubscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.navigate(['firstPage'], { relativeTo: this.route });
    this.showHeaderFooter();
  }

  showHeaderFooter() {
    const url = this.router.url;
    if (url === 'auth/client/signUp' || url === 'auth/seller/signUp') {
      return true;
    } else {
      return false;
    }
  }

}



