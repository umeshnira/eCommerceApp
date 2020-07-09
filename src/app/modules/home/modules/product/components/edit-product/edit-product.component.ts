import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductModel, Quantity, Price, Category } from '../../models/product.model';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { Constants } from 'src/app/shared/models/constants';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {

  image: string;
  formSubmitted: boolean;
  fileOver: boolean;
  isNewImage: boolean;
  categoryId: any;
  productId: any;
  productDetails: any;
  result: any;
  files: any[] = [];
  imageList: any[] = [];

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
      alert('Successful');
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.error('', error.error.message);
          console.log(error);
        } else {
          this.toastr.error('', error);
        }
      });
  }

  cancel() {
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
    producModel.updated_by = Constants.seller;
    producModel.left_qty = this.productDetailsForm?.controls['leftQty'].value;
    producModel.total_qty = this.productDetailsForm?.controls['totalQty'].value;
    producModel.price = this.productDetailsForm?.controls['price'].value;
    producModel.price_without_offer = this.productDetailsForm?.controls['priceWithoutOffer'].value;

    if (this.categoryId) {
      producModel.category_id = this.categoryId;
    }
    // producModel.category = category;
    // producModel.price = price;
    // producModel.quantity = quantity;

    if (this.imageList && this.imageList.length > 0) {
      for (let i = 0; i < this.imageList.length; i++) {
        this.formData.append('image', this.imageList[i]);
      }
    }


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
    this.productDetailsForm?.controls['batch'].setValue(this.productDetails?.batch_no);
    this.productDetailsForm?.controls['expDate'].setValue(this.productDetails?.exp_date);
    this.productDetailsForm?.controls['barCode'].setValue(this.productDetails?.bar_code);
    this.productDetailsForm?.controls['about'].setValue(this.productDetails?.about);
    this.productDetailsForm?.controls['starRate'].setValue(this.productDetails?.star_rate);
    this.productDetailsForm?.controls['leftQty'].setValue(this.productDetails?.left_qty);
    this.productDetailsForm?.controls['totalQty'].setValue(this.productDetails?.tota_qty);
    this.productDetailsForm?.controls['price'].setValue(this.productDetails?.price);
    this.productDetailsForm?.controls['priceWithoutOffer'].setValue(this.productDetails?.price_without_offer);

    if (this.productDetails.images) {

      this.productDetails.images.forEach(element => {
        this.imageList.push(element);
      });
      // this.prepareFilesList(this.imageList);
    }
  }

  private getProductDetails(productId) {

    this.getProductSubscription = this.service.getProductDetails(productId).subscribe((response) => {

      this.productDetails = response;
      if (this.productDetails?.category_id) {
        this.getCategoryTree(this.productDetails.category_id);
      }
      this.setValues();
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.error('', error.error.message);
          console.log(error);
        } else {
          this.toastr.error('', error);
        }
      });

  }

  private getCategoryTree(id) {
    this.getCategoryTreeSubscription = this.subCategoryService.getSubCategoriesByCategoryId(id).subscribe(response => {
      if (response) {
        this.result = response;
        this.field = { dataSource: this.result, id: 'id', text: 'name', child: 'subCategories' };
      }
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.error('', error.error.message);
          console.log(error);
        } else {
          this.toastr.error('', error);
        }
      });
  }

  private formInitialization() {

    this.productDetailsForm = new FormGroup({
      categoryName: new FormControl('',
        Validators.compose([Validators.required])),
      productName: new FormControl('',
        Validators.compose([Validators.required])),
      description: new FormControl('',
        Validators.compose([Validators.required])),
      batch: new FormControl('',
        Validators.compose([Validators.required])),
      expDate: new FormControl('',
        Validators.compose([Validators.required])),
      barCode: new FormControl('',
        Validators.compose([Validators.required])),
      about: new FormControl('',
        Validators.compose([Validators.required])),
      starRate: new FormControl('',
        Validators.compose([Validators.required])),
      leftQty: new FormControl('',
        Validators.compose([Validators.required])),
      totalQty: new FormControl('',
        Validators.compose([Validators.required])),
      price: new FormControl('',
        Validators.compose([Validators.required])),
      priceWithoutOffer: new FormControl('',
        Validators.compose([Validators.required])),
    });
  }

}
