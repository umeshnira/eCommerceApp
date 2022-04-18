import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "src/app/modules/home/modules/product/services/product.service";
import { SubCategoryService } from "src/app/shared/services/sub-category.service";
import { SubscriptionLike as ISubscription } from "rxjs";
import { CategoryTreeViewModel } from "../../models/category-tree-view.model";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/core/services/auth.service";
import { Constants } from "src/app/shared/models/constants";
import { ProductDetailsModel } from "../../models/product-details.model";
import { ActivatedRoute } from "@angular/router";
import { OfferService } from "../../services/offer.service";
import { Status } from "src/app/shared/enums/user-status.enum";

@Component({
  selector: "app-assign-product",
  templateUrl: "./assign-product.component.html",
  styleUrls: ["./assign-product.component.css"],
})
export class AssignProductComponent implements OnInit, OnDestroy {
  userId: number;
  categoryId: number;
  userRole: string;
  isSeller: boolean;
  categories: CategoryTreeViewModel[];
  productList: ProductDetailsModel[];
  field: Object;
  getCategoriesSubscription: ISubscription;
  getProductsBySellerIdSubscription: ISubscription;
  getAllProductsSubscription: ISubscription;
  getProductsByCategoryIdSubscription: ISubscription;
  offerProductSubcription: ISubscription;
  offerId: any;
  offerProductList: any[];
  offerProductSubmitSubcription: ISubscription;

  constructor(
    private productService: ProductService,
    private subCategoryService: SubCategoryService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private offerService: OfferService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    this.userRole = userDetails.role;
    this.offerId = this.route.snapshot.params?.id;
    this.getCategories();
    this.getofferProduct();
  }

  categoryNodeclicked(event) {
    this.categoryId = event.node.dataset.uid;
    this.getProductsByCategoryId(this.categoryId);
  }

  getProductImage(product) {
    if (product.path) {
      return product.path;
    } else {
      return product.images[0].path;
    }
  }

  ngOnDestroy() {
    if (this.getCategoriesSubscription) {
      this.getCategoriesSubscription.unsubscribe();
    }
    if (this.getProductsByCategoryIdSubscription) {
      this.getProductsByCategoryIdSubscription.unsubscribe();
    }
    if (this.getProductsBySellerIdSubscription) {
      this.getProductsBySellerIdSubscription.unsubscribe();
    }
    if (this.getAllProductsSubscription) {
      this.getAllProductsSubscription.unsubscribe();
    }
  }

  private getProductsByCategoryIdForSeller(response: ProductDetailsModel[]) {
    const productsList = response.filter((x) => x.seller_id === this.userId);
    this.productList = this.checkForSelectedProduct(productsList);
  }

  private getProductsByCategoryId(categoryId: number) {
    this.getProductsByCategoryIdSubscription = this.productService
      .getProductsByCategoryId(categoryId)
      .subscribe(
        (response) => {
          if (this.isSeller) {
            this.getProductsByCategoryIdForSeller(response);
          }
          this.productList = this.checkForSelectedProduct(response);
        },
        (error) => {
          this.toastr.warning(
            "No Products are available in this Category",
            "Sorry"
          );
        }
      );
  }

  private getCategories() {
    this.getCategoriesSubscription = this.subCategoryService
      .getSubCategoriesTree()
      .subscribe(
        (response) => {
          if (response) {
            this.categories = response;
            this.field = {
              dataSource: this.categories,
              id: "id",
              text: "name",
              child: "subCategories",
            };
          }
        },
        (error) => {
          this.toastr.error("", error.error.message);
        }
      );
  }

  private loadDefaultProductsList() {
    if (this.userRole === Constants.seller) {
      this.isSeller = true;
      this.getProductsBySellerId();
    } else {
      this.getAllProducts();
    }
  }

  private getProductsBySellerId() {
    this.getProductsBySellerIdSubscription = this.productService
      .getProductsBySellerId(this.userId)
      .subscribe(
        (response) => {
          this.productList = this.checkForSelectedProduct(response);
        },
        (error) => {
          this.toastr.warning("No Products are available", "Sorry");
        }
      );
  }

  private getAllProducts() {
    this.getAllProductsSubscription = this.productService
      .getAllProducts()
      .subscribe(
        (response) => {
          this.productList = this.checkForSelectedProduct(response);
        },
        (error) => {
          this.toastr.warning("No Products are Available", "Sorry");
        }
      );
  }

  checkForSelectedProduct(array: ProductDetailsModel[]): any {
    for (let x of array) {
      x.product_check = false;
    }
    if (this.offerProductList?.length > 0) {
      for (let x of array) {
        for (let y of this.offerProductList) {
          if (x?.id == y?.product_id) {
            x.product_check = true;
            x.product_offer_id = y.product_offer_id;
          }
        }
      }
    }

    return array;
  }

  getofferProduct() {
    this.offerProductSubcription = this.offerService
      .getOfferProducts(this.offerId, Status?.Active)
      .subscribe(
        (Response) => {
          this.offerProductList = Response;
          this.loadDefaultProductsList();
        },
        (error) => {
          this.toastr.error("", error.error.message);
          this.loadDefaultProductsList();
        }
      );
  }

  saveChanges() {
    // this.offerProductSubmitSubcription = this.offerService
    //   .saveUpdateOfferProductsSelected()
      // .subscribe(
      //   (Response) => {
         
      //   },
      //   (error) => {
      //     this.toastr.error("", error.error.message);
      //   }
      // );
  }
}
