import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Status } from 'src/app/shared/enums/user-status.enum';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { CategoryTreeViewModel } from '../../../category/models/category-tree-view.model';
import { CustomFormValidator } from 'src/app/shared/validators/custom-form.validator';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit, OnDestroy {

  categoryId: number;
  productId: number;
  image: string;
  formSubmitted: boolean;
  files: any[] = [];

  field: Object;
  formData: FormData = new FormData();
  productDetails: ProductModel;
  categories: CategoryTreeViewModel;
  getCategoriesSubscription: ISubscription;
  addProductSubscription: ISubscription;
  productDetailsForm: FormGroup;

  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;

  get form() {
    return this.productDetailsForm.controls;
  }

  constructor(
    private subCategoryService: SubCategoryService,
    private service: ProductService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.productFormInitialization();
  }

  categoryTreeNodeClicked(event) {
    this.categoryId = event.node.dataset.uid;
  }

  navigateToNextTab(tabId: number) {
    this.tabset.tabs[tabId].active = true;
  }

  navigateToPreviousTab(tabId: number) {
    this.tabset.tabs[tabId].active = true;
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
        this.router.navigate([RoutePathConfig.Home]);
      },
        (error) => {
          this.formData.delete('data');
          this.toastr.error('', error.error.message);
        });
    }
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  navigateToHomePage() {
    this.router.navigate([RoutePathConfig.Home]);
  }

  prepareImageFilesList(files: Array<any>) {
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

  ngOnDestroy() {
    if (this.getCategoriesSubscription) {
      this.getCategoriesSubscription.unsubscribe();
    }
    if (this.addProductSubscription) {
      this.addProductSubscription.unsubscribe();
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

    return productModel;

  }

  private productFormInitialization() {
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
      totalQty: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
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
        this.toastr.error('', error.error.message);
      }
    );
  }
}
