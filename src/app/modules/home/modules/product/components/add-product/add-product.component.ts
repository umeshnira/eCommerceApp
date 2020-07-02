import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Quantity, Price, Category, ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { SubCategoryService } from '../../services/sub-category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit, AfterViewInit, OnDestroy {

  categories: any;
  categoryId: any;
  productId: any;
  image: string;
  formSubmitted: boolean;
  fileOver: boolean;
  isEdit: boolean;
  files: any[] = [];

  field: Object;
  formData: FormData = new FormData();
  productDetails: ProductModel;
  getCategoriesSubscription: ISubscription;
  addProductSubscription: ISubscription;
  productDetailsForm: FormGroup;

  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;

  constructor(
    private subCategoryService: SubCategoryService,
    private service: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getCategories();
    this.formInitialization();
  }

  nodeclicked(event) {

    this.categoryId = event.node.dataset.uid;
  }

  toNextTab(id) {

    this.tabset.tabs[id].active = true;
  }

  toPreviousTab(id) {

    this.tabset.tabs[id].active = true;
  }

  addProduct() {

    const jsonData = this.addingValues();
    const value = JSON.stringify(jsonData);
    if (value) {
      this.formData.append('data', value);
    }
    this.formSubmitted = true;

    this.addProductSubscription = this.service.addProduct(this.formData).subscribe(response => {
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

  fileBrowseHandler(files) {

    this.prepareFilesList(files);
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  cancel() {
    this.router.navigate(['home']);
  }

  get form() {

    return this.productDetailsForm.controls;
  }

  ngOnDestroy() {

    if (this.getCategoriesSubscription) {
      this.getCategoriesSubscription.unsubscribe();
    }
    if (this.addProductSubscription) {
      this.addProductSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    console.log(this.tabset.tabs);
  }

  private prepareFilesList(files: Array<any>) {

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

  private addingValues() {

    const producModel = new ProductModel();
    const quantity = new Quantity();
    const price = new Price();
    const category = new Category();

    producModel.name = this.productDetailsForm?.controls['productName'].value;
    producModel.description = this.productDetailsForm?.controls['description'].value;
    producModel.batch_no = this.productDetailsForm?.controls['batch'].value;
    producModel.exp_date = this.productDetailsForm?.controls['expDate'].value;
    producModel.bar_code = this.productDetailsForm?.controls['barCode'].value;
    producModel.about = this.productDetailsForm?.controls['about'].value;
    producModel.star_rate = this.productDetailsForm?.controls['starRate'].value;
    quantity.left_qty = this.productDetailsForm?.controls['leftQty'].value;
    quantity.tota_qty = this.productDetailsForm?.controls['totalQty'].value;
    price.price = this.productDetailsForm?.controls['price'].value;
    price.price_without_offer = this.productDetailsForm?.controls['priceWithoutOffer'].value;

    category.category_id = this.categoryId;
    producModel.category = category;
    producModel.price = price;
    producModel.quantity = quantity;

    return producModel;
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

  private getCategories() {

    this.getCategoriesSubscription = this.subCategoryService.getSubCategoriesTree().subscribe(response => {
      if (response) {
        this.categories = response;
        this.field = { dataSource: this.categories, id: 'id', text: 'name', child: 'subCategories' };
      }
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.error('', error.error.message);
          console.log(error);
        } else {
          this.toastr.error('', error);
        }
      }
    );
  }
}
