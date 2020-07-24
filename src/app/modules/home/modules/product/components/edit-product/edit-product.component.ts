import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from '../../models/product.model';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { ProductDetailsModel } from '../../models/product-details.model';
import { CategoryTreeViewModel } from '../../../category/models/category-tree-view.model';
import { CustomFormValidator } from 'src/app/shared/validators/custom-form.validator';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {

  image: string;
  formSubmitted: boolean;
  isNewImage: boolean;
  categoryId: number;
  productId: number;
  userId: number;
  files: any[] = [];
  imageList: any[] = [];

  productDetails: ProductDetailsModel;
  result: CategoryTreeViewModel;
  field: Object;
  formData: FormData = new FormData();
  productDetailsForm: FormGroup;

  getProductSubscription: ISubscription;
  editProductSubscription: ISubscription;
  getCategoryTreeSubscription: ISubscription;

  get form() {
    return this.productDetailsForm.controls;
  }

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private authService: AuthService,
    private toastr: ToastrService,
    private subCategoryService: SubCategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    this.productEditFormInitialization();
    this.productId = this.route.snapshot.queryParams.productId;
    this.categoryId = this.route.snapshot.queryParams.categoryId;
    this.getProductDetails(this.productId);
  }

  editProduct() {
    this.formSubmitted = true;

    this.prepareRequestModel();

    this.editProductSubscription = this.service.editProduct(this.productId, this.formData).subscribe(response => {
      this.formData.delete('data');
      this.toastr.success('Product Updated Successfully', 'Success');
      this.router.navigate([RoutePathConfig.Home]);
    },
      (error) => {
        this.formData.delete('data');
        this.toastr.error('', error.error.message);
      });
  }

  exitEditPage() {
    this.router.navigate([RoutePathConfig.Home]);
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  deleteImage(index: number) {
    this.imageList.splice(index, 1);
  }

  nodeclicked(event) {
    this.categoryId = event.node.dataset.uid;
  }

  prepareImageFilesList(files: Array<any>) {
    this.isNewImage = true;

    for (const item of files) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.image = event.target.result;
        this.files.push(this.image);
      };
      reader.readAsDataURL(item);
    }
    for (let i = 0; i < files.length; i++) {
      this.formData.append('image', files[i]);
    }

  }

  ngOnDestroy() {
    if (this.getProductSubscription) {
      this.getProductSubscription.unsubscribe();
    }
    if (this.getCategoryTreeSubscription) {
      this.getCategoryTreeSubscription.unsubscribe();
    }
    if (this.editProductSubscription) {
      this.editProductSubscription.unsubscribe();
    }
  }

  private prepareRequestModel() {
    const productModel = new ProductModel();

    productModel.name = this.productDetailsForm?.controls['productName'].value;
    productModel.description = this.productDetailsForm?.controls['description'].value;
    productModel.batch_no = this.productDetailsForm?.controls['batch'].value;
    productModel.exp_date = this.productDetailsForm?.controls['expDate'].value;
    productModel.bar_code = this.productDetailsForm?.controls['barCode'].value;
    productModel.about = this.productDetailsForm?.controls['about'].value;
    productModel.star_rate = this.productDetailsForm?.controls['starRate'].value;
    productModel.left_qty = this.productDetailsForm?.controls['leftQty'].value;
    productModel.total_qty = this.productDetailsForm?.controls['totalQty'].value;
    productModel.price = this.productDetailsForm?.controls['price'].value;
    productModel.seller_id = this.userId;
    this.imageList.forEach(element => {
      productModel.images.push(element.name);
    });

    if (this.categoryId) {
      productModel.category_id = this.categoryId;
    }

    const model = JSON.stringify(productModel);
    if (model) {
      this.formData.append('data', model);
    }
  }

  private setValues() {
    this.productDetailsForm?.controls['productName'].setValue(this.productDetails?.name);
    this.productDetailsForm?.controls['description'].setValue(this.productDetails?.description);
    this.productDetailsForm?.controls['batch'].setValue(this.productDetails?.batch_no);
    this.productDetailsForm?.controls['expDate'].setValue(this.productDetails?.exp_date);
    this.productDetailsForm?.controls['barCode'].setValue(this.productDetails?.bar_code);
    this.productDetailsForm?.controls['about'].setValue(this.productDetails?.about);
    this.productDetailsForm?.controls['starRate'].setValue(this.productDetails?.star_rate);
    this.productDetailsForm?.controls['leftQty'].setValue(this.productDetails?.left_qty);
    this.productDetailsForm?.controls['totalQty'].setValue(this.productDetails?.total_qty);
    this.productDetailsForm?.controls['price'].setValue(this.productDetails?.price);

    if (this.productDetails.images) {

      this.productDetails.images.forEach(element => {
        this.imageList.push(element);
      });
    }
  }

  private getProductDetails(productId: number) {
    this.getProductSubscription = this.service.getProductDetails(productId).subscribe((response) => {

      this.productDetails = response;
      if (this.productDetails?.category_id) {
        this.getCategoryTree(this.productDetails.category_id);
      }
      this.setValues();
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });

  }

  private getCategoryTree(categoryId: number) {
    this.getCategoryTreeSubscription = this.subCategoryService.getSubCategoriesByCategoryId(categoryId).subscribe(response => {
      if (response) {
        this.result = response;
        this.field = { dataSource: this.result, id: 'id', text: 'name', child: 'subCategories' };
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  private productEditFormInitialization() {
    this.productDetailsForm = new FormGroup({
      categoryName: new FormControl('',
        Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
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
      leftQty: new FormControl('', [Validators.required]),
      totalQty: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
  }

}
