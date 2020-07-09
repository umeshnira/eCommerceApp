import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { CategoryService } from '../../../../../../shared/services/category.service';
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
  getCategoriesSubscription: ISubscription;
  deleteCategorySubscription: ISubscription;

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

    this.deleteCategorySubscription = this.service.deleteCategory(id).subscribe(response => {
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

    if (this.getCategoriesSubscription) {
      this.getCategoriesSubscription.unsubscribe();
    }
    if (this.deleteCategorySubscription) {
      this.deleteCategorySubscription.unsubscribe();
    }
  }

  private getCategories() {

    this.getCategoriesSubscription = this.service.getCategories().subscribe(response => {
      if (response) {
        this.categories = response;

      }
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        this.toastr.error('', error.error.message);
        console.log(error);
      } else {
        this.toastr.error('', error);
      }
    });
  }
}
