import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { SubCategoryService } from '../../services/sub-category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {

  image: string;
  formSubmitted: boolean;
  fileOver: boolean;
  categoryId: any;
  productId: any;
  productDetails: any;
  result: any;
  files: any[] = [];

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
    this.getProductDetails(this.productId);
  }

  editProduct() {

    this.formSubmitted = true;

    this.editProductSubscription = this.service.editProduct(this.formData).subscribe(response => {
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
    this.router.navigate(['home']);
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

  private prepareFilesList(files: Array<any>) {

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
    // this.productDetailsForm?.controls['about'].setValue(this.productDetails?.name);
    this.productDetailsForm?.controls['starRate'].setValue(this.productDetails?.star_rate);
    this.productDetailsForm?.controls['leftQty'].setValue(this.productDetails?.left_qty);
    this.productDetailsForm?.controls['totalQty'].setValue(this.productDetails?.tota_qty);
    this.productDetailsForm?.controls['price'].setValue(this.productDetails?.price);
    this.productDetailsForm?.controls['priceWithoutOffer'].setValue(this.productDetails?.price_without_offer);
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
