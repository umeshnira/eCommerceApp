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
    this.addingValues();

    this.formSubmitted = true;

    this.addProductSubscription = this.service.addProduct(this.formData).subscribe(response => {
      alert('Successful');
      this.formData.delete('data');
    },
      (error) => {
        this.formData.delete('data');
        this.toastr.error('', error.error.message);
      });
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
    const producModel = new ProductModel();

    producModel.name = this.productDetailsForm?.controls['productName'].value;
    producModel.description = this.productDetailsForm?.controls['description'].value;
    producModel.batch_no = this.productDetailsForm?.controls['batch'].value;
    producModel.exp_date = this.productDetailsForm?.controls['expDate'].value;
    producModel.bar_code = this.productDetailsForm?.controls['barCode'].value;
    producModel.about = this.productDetailsForm?.controls['about'].value;
    producModel.star_rate = this.productDetailsForm?.controls['starRate'].value;
    producModel.status = Status.Active;
    producModel.left_qty = this.productDetailsForm?.controls['leftQty'].value;
    producModel.total_qty = this.productDetailsForm?.controls['totalQty'].value;
    producModel.price = this.productDetailsForm?.controls['price'].value;
    producModel.category_id = this.categoryId;

    const model = JSON.stringify(producModel);
    if (model) {
      this.formData.append('data', model);
    }
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
      leftQty: new FormControl('', [Validators.required]),
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
