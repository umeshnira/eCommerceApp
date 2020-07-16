import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SubCategoryService } from '../../../../../../shared/services/sub-category.service';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { SubCategoryModel } from '../../models/sub-category.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-category',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css']
})

export class ListSubCategoryComponent implements OnInit, OnDestroy {

  categoryId: number;

  subCategoriesList: SubCategoryModel;

  getAllCategoriesSubscription: ISubscription;
  deleteSubCategorySubscription: ISubscription;

  constructor(
    private service: SubCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getSubcategoriesList();
  }

  navigateToEditPage(subCategoryId: number) {
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { subCategoryId: subCategoryId },
      relativeTo: this.route
    };

    this.router.navigate(['edit'], navigationExtras);
  }

  deleteSubCategory(subCategoryId: number) {
    this.deleteSubCategorySubscription = this.service.deleteSubCategory(subCategoryId).subscribe(response => {

      if (response) {
        this.toastr.success('SubCategory Deleted Successfully', 'Success');
      }
    }, (error) => {
      this.toastr.error('', error.error.message);
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

  private getSubcategoriesList() {
    this.getAllCategoriesSubscription = this.service.getAllSubCategories().subscribe(response => {

      if (response) {
        this.subCategoriesList = response;
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      }
    );
  }

}
