import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductModel } from 'src/app/modules/home/modules/product/models/product.model';
import { CategoryTreeViewModel } from 'src/app/modules/home/modules/category/models/category-tree-view.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { ProductService } from 'src/app/modules/home/modules/product/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { Status } from 'src/app/shared/enums/user-status.enum';
import { CustomFormValidator } from 'src/app/shared/validators/custom-form.validator';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-add-product-list',
  templateUrl: './add-product-list.component.html',
  styleUrls: ['./add-product-list.component.css']
})
export class AddProductListComponent implements OnInit, OnDestroy {

  categoryId: number;
  productId: number;
  userId: number;
  image: string;
  formSubmitted: boolean;
  isEdit: boolean;
  hasNewImage: boolean;
  isLinear = false;
  files: any[] = [];
  imageList: any[] = [];
  minDate=new Date();

  field: Object;
  formData: FormData = new FormData();
  productDetails: ProductModel;
  categories: CategoryTreeViewModel[];
  productDetailsForm: FormGroup;

  getCategoriesSubscription: ISubscription;
  addProductSubscription: ISubscription;
  getProductSubscription: ISubscription;
  editProductSubscription: ISubscription;


  get form() {
    return this.productDetailsForm.controls;
  }



  constructor(
    private subCategoryService: SubCategoryService,
    private service: ProductService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  @ViewChild('tree', { static: true })
  public tree: TreeViewComponent;

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    if (this.route.snapshot.url[0].path === 'edit') {
      this.productId = this.route.snapshot.queryParams.productId;
      this.getProductDetails(this.productId);
      this.isEdit = true;
    }
    this.getCategories();
    this.productFormInitialization();

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
  categoryTreeNodeClicked(event) {
    this.categoryId = event.node.dataset.uid;
  }

  addProduct() {
    const productModel = this.addingValues();

    if (!productModel.category_id) {
      this.toastr.warning('Please select a category to proceed', 'Warning');
    } else {
      const model = JSON.stringify(productModel);
      if (model) {
        this.formData.append('data', model);
      }

      this.formSubmitted = true;

      this.addProductSubscription = this.service.addProduct(this.formData).subscribe(response => {

        this.toastr.success('Product Added Successfully', 'Success');
        this.formData.delete('data');
        this.productDetailsForm.reset();
        this.formSubmitted = false;
        this.router.navigate([`${RoutePathConfig.Dashboard}/${RoutePathConfig.Products}`]);
      },
        (error) => {
          this.formData.delete('data');
          this.toastr.error('', error.error.message);
        });
    }
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.hasNewImage = this.files.length === 0 ? false : true;
  }

  deleteImage(index: number) {
    this.imageList.splice(index, 1);
  }


  navigateToHomePage() {
    this.router.navigate([RoutePathConfig.Home]);
  }

  prepareImageFilesList(files: Array<any>) {
    this.hasNewImage = this.isEdit === true ? true : false;
    for (const item of files) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.image = event.target.result;
        this.files.push(this.image);
        for (let i = 0; i < files.length; i++) {
          this.formData.append('image', files[i]);
        }
      };
      reader.readAsDataURL(item);
    }

  }

  editProduct() {

    const productModel = this.addingValues();

    if (!productModel.category_id) {
      this.toastr.warning('Please select a category to proceed', 'Warning');
    } else {
      const model = JSON.stringify(productModel);
      if (model) {
        this.formData.append('data', model);
      }
      this.formSubmitted = true;

      this.editProductSubscription = this.service.editProduct(this.productId, this.formData).subscribe(response => {
        this.formData.delete('data');
        this.toastr.success('Product Updated Successfully', 'Success');
        const path = `${RoutePathConfig.Dashboard}/${RoutePathConfig.Products}`;
        this.router.navigate([path]);
      },
        (error) => {
          this.formData.delete('data');
          this.toastr.error('', error.error.message);
        });
    }
  }

  ngOnDestroy() {
    if (this.getCategoriesSubscription) {
      this.getCategoriesSubscription.unsubscribe();
    }
    if (this.addProductSubscription) {
      this.addProductSubscription.unsubscribe();
    }
    if (this.editProductSubscription) {
      this.editProductSubscription.unsubscribe();
    }
  }

  private getProductDetails(productId: number) {
    this.getProductSubscription = this.service.getProductDetails(productId).subscribe((response) => {

      this.productDetails = response;
      if (this.productDetails?.category_id) {
        this.categoryId = this.productDetails.category_id;
        this.getCategories();
      }
      this.setValues();
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });

  }

  private setValues() {
    this.productDetailsForm?.controls['productName'].setValue(this.productDetails?.name);
    this.productDetailsForm?.controls['description'].setValue(this.productDetails?.description);
    this.productDetailsForm?.controls['batch'].setValue(this.productDetails?.batch_no);
    this.productDetailsForm?.controls['expDate'].setValue(this.productDetails?.exp_date);
    this.productDetailsForm?.controls['barCode'].setValue(this.productDetails?.bar_code);
    this.productDetailsForm?.controls['about'].setValue(this.productDetails?.about);
    this.productDetailsForm?.controls['starRate'].setValue(this.productDetails?.star_rate);
    this.productDetailsForm?.controls['totalQty'].setValue(this.productDetails?.total_qty);
    this.productDetailsForm?.controls['price'].setValue(this.productDetails?.price);

    if (this.productDetails.images) {

      this.productDetails.images.forEach(image => {
        this.imageList.push(image);
      });
    }
  }

  private addingValues() {
    const productModel = new ProductModel();

    productModel.name = this.productDetailsForm?.controls['productName'].value;
    productModel.description = this.productDetailsForm?.controls['description'].value;
    productModel.batch_no = this.productDetailsForm?.controls['batch'].value;
    productModel.exp_date = this.productDetailsForm?.controls['expDate'].value;
    productModel.bar_code = this.productDetailsForm?.controls['barCode'].value;
    productModel.about = this.productDetailsForm?.controls['about'].value;
    productModel.star_rate = this.productDetailsForm?.controls['starRate'].value;
    productModel.status = Status.Active;
    productModel.left_qty = this.productDetailsForm?.controls['totalQty'].value;
    productModel.total_qty = this.productDetailsForm?.controls['totalQty'].value;
    productModel.price = this.productDetailsForm?.controls['price'].value;
    productModel.category_id = this.categoryId;
    productModel.seller_id = this.userId;

    if (this.isEdit) {
      this.imageList.forEach(image => {
        productModel.images.push(image.name);
      });
    }

    return productModel;

  }

  private productFormInitialization() {
    this.productDetailsForm = new FormGroup({
      // categoryName: new FormControl('',
      //   Validators.compose([Validators.required,
      //   CustomFormValidator.cannotContainSpace])),
      productName: new FormControl('',
        Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
      description: new FormControl('',
        Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
      batch: new FormControl('', [Validators.required]),
      expDate: new FormControl('', [Validators.required]),
      barCode: new FormControl('', [Validators.required]),
      about: new FormControl('', [Validators.required]),
      starRate: new FormControl('', [Validators.required]),
      totalQty: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
  }

  private getCategories() {
    this.getCategoriesSubscription = this.subCategoryService.getSubCategoriesTree().subscribe(response => {
      if (response) {

        this.categories = response;
        if (this.isEdit === true) {
          // this.categories = this.getCategoryNode(this.categories);
          // let categories = new Array<CategoryTreeViewModel>();
          const categories = response;
          this.getTreeNode(this.categories, this.categoryId);
          this.field = { dataSource: this.categories, id: 'id', text: 'name', child: 'subCategories', selected: 'isSelected' };
        } else {
          this.field = { dataSource: this.categories, id: 'id', text: 'name', child: 'subCategories' };
        }
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      }
    );
  }

  private getTreeNode(newArray: Array<CategoryTreeViewModel>, categoryId: number) {
    if (newArray) {
      for (let i = 0; i < newArray.length; i++) {
        newArray[i].expanded = true;
        if (newArray[i].id === categoryId) {
          newArray[i].isSelected = true;
          return newArray[i];
        }
        const hasFoundCategory = this.getTreeNode(newArray[i].subCategories, categoryId);
        if (hasFoundCategory) {
          return hasFoundCategory;
        }
      }
    }

  }

  // private getCategoryNode(categories: Array<CategoryTreeViewModel>) {
  //   categories.map((category, index = 0) => {
  //     if (category.id === this.categoryId) {
  //       category.isSelected = true;
  //       categories[index].expanded = true;
  //      this.expandTree(categories, index);
  //       return this.categories;
  //     }
  //     const hasFoundCategory = this.getCategoryNode(categories[index].subCategories);
  //     if (hasFoundCategory) {
  //       return hasFoundCategory;
  //     }
  //   });
  //   return this.categories;

  // }

  // private expandTree(category: CategoryTreeViewModel[], i: number) {
  //   if (category[i].parent_category_id) {
  //     this.categories.map((element, index = i) => {
  //       if (element.subCategories.length > 0 && index <= i) {
  //             if (element.subCategories[i].parent_category_id === element.id) {
  //               element.expanded = true;
  //               return this.categories;
  //             }
  //       const hasFoundCategory = this.expandTree(this.categories[i].subCategories, i);
  //       if (hasFoundCategory) {
  //         return hasFoundCategory;
  //       }
  //     }
  //     });
  //   }
  //   return this.categories;
  // }

}

// if (category[i].parent_category_id) {
//   this.categories.map((element, index = i) => {
//     if (element.subCategories.length > 0 && index <= i) {
//       if (element.subCategories[i].parent_category_id === element.id) {
//         element.expanded = true;
//         return this.categories;
//       }
//     }
//     const hasFoundCategory = this.expandTree(category[i].subCategories, i);
//     if (hasFoundCategory) {
//       return hasFoundCategory;
//     }
//   });
// }
// return this.categories;
// }

  // if (this.categories[index].subCategories) {
  //   this.categories[index].subCategories[index].expanded = true;
  // }

  // if (categories) {
  //   for (let i = 0; i < categories.length; i++) {
  //     if (categories[i].id === this.categoryId) {
  //       categories[i].expanded = true;
  //       categories[i].isSelected = true;
  //       return categories;
  //     }
  //     const hasFoundCategory = this.getCategoryNode(categories[i].subCategories);
  //     if (hasFoundCategory) {
  //       return hasFoundCategory;
  //     }
  //   }
  // }


  // categories.map((element, index = 0) => {
  //   if (element.id === this.categoryId) {
  //     element.isSelected = true;
  //     element.expanded = true;
  //     return categories;
  //   }
  //   const hasFoundCategory = this.getCategoryNode(categories[index].subCategories);
  //   if (hasFoundCategory) {
  //     return hasFoundCategory;
  //   }
  // });
  // return categories;

