import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubCategoryModel } from 'src/app/modules/home/modules/category/models/sub-category.model';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
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
  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
    }
  ngAfterViewInit() {

  this.loadScript('assets/js/datatable.js');
  }
  navigateToEditPage(subCategoryId: number) {
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { subCategoryId: subCategoryId },
      relativeTo: this.route
    };

    this.router.navigate(['edit'], navigationExtras);
  }

  deleteSubCategory(subCategory: SubCategoryModel, index: number) {
    if (subCategory.hasSubCategory) {
      this.toastr.warning('Categories with Subcategory cannot be deleted', 'Warning');
    } else {
    this.deleteSubCategorySubscription = this.service.deleteSubCategory(subCategory.id).subscribe(response => {

      if (response) {
        this.subCategoriesList.splice(index, 1);
        this.getSubcategoriesList();
        this.toastr.success('SubCategory Deleted Successfully', 'Success');
      }
    }, (error) => {
      this.toastr.error('', error.error.message);
    });
  }
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
        this.checkHasSubCategory();
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      }
    );
  }

  private checkHasSubCategory() {
    let newArray = new Array<SubCategoryModel>();
    newArray = this.subCategoriesList;
    for (let i = 0; i < newArray.length; i++) {
      for (let j = 0; j < newArray.length; j++) {
          if(newArray[i].id === newArray[j].parent_category_id) {
            newArray[i].hasSubCategory = true;
          }
      }
    }
    this.subCategoriesList = newArray;
  }


}
