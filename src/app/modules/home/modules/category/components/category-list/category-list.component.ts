import { Component, OnInit, OnDestroy } from "@angular/core";
import { SubscriptionLike as ISubscription } from "rxjs";
import { CategoryService } from "../../../../../../shared/services/category.service";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CategoryModel } from "../../models/category.model";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { CustomConfirmComponent } from "src/app/shared/components/custom-confirm/custom-confirm.component";
import { Constants } from "src/app/shared/models/constants";

const config = {
  backdrop: true,
  ignoreBackdropClick: false,
};

@Component({
  selector: "app-list-category",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"],
})
export class ListCategoryComponent implements OnInit, OnDestroy {
  categories: CategoryModel[];
  bsModalRef: BsModalRef;
  getCategoriesSubscription: ISubscription;
  deleteCategorySubscription: ISubscription;

  constructor(
    private service: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  goToEditPage(categoryId: number) {
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { categoryId: categoryId },
      relativeTo: this.route,
    };

    this.router.navigate(["edit"], navigationExtras);
  }

  deleteCategory(categoryId: number, index: number) {
    this.bsModalRef = this.modalService.show(CustomConfirmComponent, config);
    this.bsModalRef.content.data = Constants?.categoryDeleteText;
    this.bsModalRef.content.onClose.subscribe((result) => {
      this.bsModalRef.hide();
      if (result) {
        this.deleteCategorySubscription = this.service
          .deleteCategory(categoryId)
          .subscribe(
            (response) => {
              // this.categories.splice(index, 1);
              this.getCategories();
              this.toastr.success("Category Deleted Successfully", "Success");
            },
            (error) => {
              this.toastr.error("", error.error.message);
            }
          );
      }
    });
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
    this.getCategoriesSubscription = this.service.getCategories().subscribe(
      (response) => {
        if (response) {
          this.categories = response;
          this.categories = this.categories.filter(
            (x) => x.parent_category_id === null
          );
        }
      },
      (error) => {
        this.toastr.error("", error.error.message);
      }
    );
  }
}
