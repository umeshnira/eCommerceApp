import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { CategoryService } from '../../../../../../shared/services/category.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from '../../models/category.model';

@Component({
  selector: 'app-list-category',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class ListCategoryComponent implements OnInit, OnDestroy {

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
        this.categories = this.categories.filter(x => x.parent_category_id === null);

      }
    }, (error) => {
      this.toastr.error('', error.error.message);
    });
  }
}
