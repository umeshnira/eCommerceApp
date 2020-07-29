import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubCategoryModel } from 'src/app/modules/home/modules/category/models/sub-category.model';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionLike as ISubscription } from 'rxjs';
@Component({
  selector: 'app-dashboard-sub-category',
  templateUrl: './dashboard-sub-category.component.html',
  styleUrls: ['./dashboard-sub-category.component.css']
})
export class DashboardSubCategoryComponent implements OnInit, OnDestroy {

  categoryId: number;

  subCategoriesList: SubCategoryModel[];

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

  deleteSubCategory(subCategoryId: number, index: number) {
    this.deleteSubCategorySubscription = this.service.deleteSubCategory(subCategoryId).subscribe(response => {

      if (response) {
        this.subCategoriesList.splice(index, 1);
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
        const responseList = response;

        this.subCategoriesList = responseList.filter(x => x.parent_category_id !== null);
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      }
    );
  }


}
