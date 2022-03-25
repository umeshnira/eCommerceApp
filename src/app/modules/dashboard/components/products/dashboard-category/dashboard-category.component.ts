import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { SubscriptionLike as ISubscription } from "rxjs";
import { CategoryModel } from "src/app/modules/home/modules/category/models/category.model";
import { CategoryService } from "src/app/shared/services/category.service";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { RoutePathConfig } from "src/app/core/config/route-path-config";
import { SubCategoryService } from "src/app/shared/services/sub-category.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { CustomConfirmComponent } from "src/app/shared/components/custom-confirm/custom-confirm.component";
import { Constants } from "src/app/shared/models/constants";

const config = {
  backdrop: true,
  ignoreBackdropClick: false,
};

@Component({
  selector: "app-dashboard-category",
  templateUrl: "./dashboard-category.component.html",
  styleUrls: ["./dashboard-category.component.css"],
})
export class DashboardCategoryComponent implements OnInit, OnDestroy,AfterViewInit {
  categories: CategoryModel[];
  bsModalRef: BsModalRef;
  getAllCategoriesSubscription: ISubscription;
  deleteCategorySubscription: ISubscription;

  constructor(
    private service: CategoryService,
    private subCategoryService: SubCategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  ngAfterViewInit() {
    this.loadScript("assets/js/datatable.js");
  }
  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement("script");
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
  goToEditPage(categoryId: number) {
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { categoryId: categoryId },
      relativeTo: this.route,
    };

    this.router.navigate(["edit"], navigationExtras);
  }

  deleteCategory(category: CategoryModel, index: number) {
    this.bsModalRef = this.modalService.show(CustomConfirmComponent, config);
    this.bsModalRef.content.data = Constants?.categoryDeleteText;
    this.bsModalRef.content.onClose.subscribe((result) => {
      this.bsModalRef.hide();
      if (result) {
        if (category.hasSubCategory) {
          this.toastr.warning(
            "Categories with Subcategory cannot be deleted",
            "Warning"
          );
        } else {
          this.deleteCategorySubscription = this.service
            .deleteCategory(category.id)
            .subscribe(
              (response) => {
                this.categories.splice(index, 1);
                this.toastr.success("Category Deleted Successfully", "Success");
              },
              (error) => {
                this.toastr.error("", error.error.message);
              }
            );
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.getAllCategoriesSubscription) {
      this.getAllCategoriesSubscription.unsubscribe();
    }
    if (this.deleteCategorySubscription) {
      this.deleteCategorySubscription.unsubscribe();
    }
  }

  private getAllCategories() {
    this.getAllCategoriesSubscription = this.service.getCategories().subscribe(
      (response) => {
        if (response) {
          this.categories = response;
          this.checkHasSubCategory();
        }
      },
      (error) => {
        this.toastr.error("", error.error.message);
      }
    );
  }

  private checkHasSubCategory() {
    for (let i = 0; i < this.categories.length; i++) {
      for (let j = 0; j < this.categories.length; j++) {
        if (this.categories[i].id === this.categories[j].parent_category_id) {
          this.categories[i].hasSubCategory = true;
        }
      }
    }
    const newArray = new Array<CategoryModel>();
    this.categories.forEach((element) => {
      if (element.parent_category_id === null) {
        newArray.push(element);
      }
    });
    this.categories = newArray;
  }
}
