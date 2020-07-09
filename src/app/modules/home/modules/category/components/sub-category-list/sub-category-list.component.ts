import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SubCategoryService } from '../../../../../../shared/services/sub-category.service';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { SubCategoryModel } from '../../models/sub-category.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-category',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css']
})

export class ListSubCategoryComponent implements OnInit, OnDestroy {

  categoryId: any;
  categories: any;
  categoriesByPath: any;

  field: Object;
  subCategories: SubCategoryModel;
  getAllCategoriesSubscription: ISubscription;
  deleteSubCategorySubscription: ISubscription;

  constructor(
    private service: SubCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.getAllCategories();
  }

  goToEditPage(id) {

    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: {
        subCategoryId: id,
      },
      relativeTo: this.route
    };
    this.router.navigate(['edit'], navigationExtras);

  }

  deleteSubCategory(id) {

    this.deleteSubCategorySubscription = this.service.deleteSubCategory(id).subscribe(response => {
      console.log('Deleted sub category');
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        this.toastr.error('', error.error.message);
        console.log(error);
      } else {
        this.toastr.error('', error);
      }
    });
  }

  ngOnDestroy() {

    if (this.getAllCategoriesSubscription) {
      this.getAllCategoriesSubscription.unsubscribe();
    }
    if (this.deleteSubCategorySubscription) {
      this.deleteSubCategorySubscription.unsubscribe();
    }
  }

  private getAllCategories() {

    this.getAllCategoriesSubscription = this.service.getAllSubCategories().subscribe(response => {
      if (response) {
        this.categoriesByPath = response;

      }
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

}
