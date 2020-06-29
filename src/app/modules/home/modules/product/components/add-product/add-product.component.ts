import { Component, OnInit, ViewChild } from '@angular/core';
import { SubCategoryService } from '../../../category/services/sub-category.service';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { FormDataModel, Quantity, Price, Category } from '../../models/formData.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories: any;
  categoryId: any;

  field: Object;
  getCategoriesSubscription: ISubscription;
  productDetailsForm: FormGroup;

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;

  constructor(
    private service: SubCategoryService
  ) { }

  ngOnInit(): void {

    this.getCategories();
    this.formInitialization();
  }

  nodeclicked(event) {

    this.categoryId = event.node.dataset.uid;
  }

  fileUpload(event) {

  }

  addProduct() {
    const jsonData = this.setValueToAdd();
    if (jsonData) {
      const formData = new FormData();
      Object.keys(jsonData).forEach((key) => {
        formData.append(key, jsonData[key]);
      });
    }
  }

  private setValueToAdd() {

    const model = new FormDataModel();
    const quantity = new Quantity();
    const price = new Price();
    const category = new Category();
    model.name = this.productDetailsForm?.controls['productName'].value;
    model.description = this.productDetailsForm?.controls['description'].value;
    model.batch_no = this.productDetailsForm?.controls['batch'].value;
    model.exp_date = this.productDetailsForm?.controls['expDate'].value;
    model.bar_code = this.productDetailsForm?.controls['barCode'].value;
    model.about = this.productDetailsForm?.controls['about'].value;
    model.star_rate = this.productDetailsForm?.controls['starRate'].value;
    quantity.left_qty = this.productDetailsForm?.controls['leftQty'].value;
    quantity.tota_qty = this.productDetailsForm?.controls['totalQty'].value;
    price.price = this.productDetailsForm?.controls['price'].value;
    price.price_without_offer = this.productDetailsForm?.controls['priceWithoutOffer'].value;
    category.category_id = this.categoryId;
    model.category.push(category);
    model.price.push(price);
    model.quantity.push(quantity);

    return model;
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

    this.getCategoriesSubscription = this.service.getSubCategoriesTree().subscribe(response => {
      if (response) {
        this.categories = response;
        this.field = { dataSource: this.categories, id: 'id', text: 'name', child: 'subCategories' };
      }
    },
      (error) => {
        console.log(error);
      }
    );
  }
}
