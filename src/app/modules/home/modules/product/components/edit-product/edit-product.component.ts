import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductModel} from '../../models/product.model';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { Constants } from 'src/app/shared/models/constants';
import { ProductDetailsModel } from '../../models/product-details.model';
import { CategoryTreeViewModel } from '../../../category/models/category-tree-view.model';
import { CustomFormValidator } from 'src/app/shared/validators/custom-form.validator';

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

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private toastr: ToastrService,
    private subCategoryService: SubCategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.formInitialization();
    this.productId = this.route.snapshot.queryParams.productId;
    this.categoryId = this.route.snapshot.queryParams.categoryId;
    this.getProductDetails(this.productId);

  }

  editProduct() {

    this.formSubmitted = true;

    const jsonData = this.prepareRequestModel();
    const value = JSON.stringify(jsonData);
    if (value) {
      this.formData.append('data', value);
    }

    this.editProductSubscription = this.service.editProduct(this.productId, this.formData).subscribe(response => {

      this.formData.delete('data');
      this.formData.delete('image');
    },
    (error) => {
      this.toastr.error('', error.error.message);
    });
  }

  cancelEdit() {
    this.router.navigate(['home/products']);
  }

  fileBrowseHandler(files) {

    this.prepareFilesList(files);
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
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

  get form() {

    return this.productDetailsForm.controls;
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

    const producModel = new ProductModel();
    // const quantity = new Quantity();
    // const price = new Price();
    // const category = new Category();

    producModel.name = this.productDetailsForm?.controls['productName'].value;
    producModel.description = this.productDetailsForm?.controls['description'].value;
    producModel.batch_no = this.productDetailsForm?.controls['batch'].value;
    producModel.exp_date = this.productDetailsForm?.controls['expDate'].value;
    producModel.bar_code = this.productDetailsForm?.controls['barCode'].value;
    producModel.about = this.productDetailsForm?.controls['about'].value;
    producModel.star_rate = this.productDetailsForm?.controls['starRate'].value;
    producModel.left_qty = this.productDetailsForm?.controls['leftQty'].value;
    producModel.total_qty = this.productDetailsForm?.controls['totalQty'].value;
    producModel.price = this.productDetailsForm?.controls['price'].value;

    if (this.categoryId) {
      producModel.category_id = this.categoryId;
    }
    // producModel.category = category;
    // producModel.price = price;
    // producModel.quantity = quantity;

    // if (this.imageList && this.imageList.length > 0) {
    //   for (let i = 0; i < this.imageList.length; i++) {
    //     this.formData.append('image', this.imageList[i]);
    //   }
    // }


    return producModel;
  }

  private prepareFilesList(files: Array<any>) {

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

  private setValues() {

    this.productDetailsForm?.controls['productName'].setValue(this.productDetails?.name);
    this.productDetailsForm?.controls['description'].setValue(this.productDetails?.description);
    this.productDetailsForm?.controls['batch'].setValue(this.productDetails?.p_batch_no);
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
      // this.prepareFilesList(this.imageList);
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

  private formInitialization() {

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
