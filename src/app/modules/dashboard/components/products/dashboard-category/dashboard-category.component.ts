import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { CategoryModel } from 'src/app/modules/home/modules/category/models/category.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-dashboard-category',
  templateUrl: './dashboard-category.component.html',
  styleUrls: ['./dashboard-category.component.css']
})
export class DashboardCategoryComponent implements OnInit, OnDestroy {

  categories: CategoryModel[];

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

  goToEditPage(categoryId: number) {
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { categoryId: categoryId },
      relativeTo: this.route
    };

    this.router.navigate(['edit'], navigationExtras);
  }

  deleteCategory(categoryId: number, index: number) {
    this.deleteCategorySubscription = this.service.deleteCategory(categoryId).subscribe(response => {

      this.categories.splice(index, 1);
      this.toastr.success('Category Deleted Successfully', 'Success');
    },
      (error) => {
        this.toastr.error('', error.error.message);
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
      this.toastr.error('', error.error.message);
    });
  }
}


