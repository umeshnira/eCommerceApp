import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-category',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class ListCategoryComponent implements OnInit, OnDestroy {

  categories: any;
  subscription: ISubscription;

  constructor(
    private service: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.getCategories();
  }

  goToEditPage(id) {

    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { categoryId: id },
      relativeTo: this.route
    };
    this.router.navigate(['edit'], navigationExtras);

  }

  deleteCategory(id) {

    this.service.deleteCategory(id).subscribe(response => {
      this.toastr.success('', 'Deleted Category');
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.error('', error.error.message);
          console.log(error);
        } else {
          this.toastr.error('', error);
        }
      }
    );
  }

  ngOnDestroy() {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getCategories() {

    this.subscription = this.service.getCategories().subscribe(response => {
      if (response) {
        this.categories = response;

      }
    }, (error) => {
      console.log(error);
    });
  }
}
