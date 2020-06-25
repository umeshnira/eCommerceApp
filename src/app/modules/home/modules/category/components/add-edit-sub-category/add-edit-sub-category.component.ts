import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SubCategoryModel } from '../../models/sub-category.model';
import { SubCategoryService } from '../../services/sub-category.service';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-sub-category',
  templateUrl: './add-edit-sub-category.component.html',
  styleUrls: ['./add-edit-sub-category.component.css']
})

export class AddEditSubCategoryComponent implements OnInit, OnDestroy {

  categories: any;
  subCategoryId: any;
  categoryId: number;
  formSubmitted: boolean;
  isEdit: boolean;

  subCategory: SubCategoryModel;
  field: Object;
  subCategoryForm: FormGroup;
  subscription: ISubscription;
  getCategoriesSubscription: ISubscription;

  constructor(
    private service: SubCategoryService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.formInitialization();
    this.getCategories();
    if (this.route.snapshot.url[1].path === 'edit') {
      this.subCategoryId = this.route.snapshot.queryParams.subCategoryId;
      this.getSubCategory(this.subCategoryId);
      this.isEdit = true;
    }
  }

  submitForm() {

    this.formSubmitted = true;

    if (this.subCategoryForm.valid) {

      const subCategoryModel = new SubCategoryModel();
      subCategoryModel.parent_category_id = this.categoryId;
      subCategoryModel.name = this.subCategoryForm.controls['name'].value;
      subCategoryModel.description = this.subCategoryForm.controls['description'].value;
      subCategoryModel.inserted_by = 'Seller';

      this.subscription = this.service.addSubCategory(subCategoryModel).subscribe((response) => {

        this.formSubmitted = false;
        this.subCategoryForm.reset();
      },
        (error) => {
          console.log(error);
        });
    }
  }

  nodeclicked(event) {
    const value = event.node.textContent;
    this.subCategoryForm?.controls['parentCategory'].setValue(value);
    this.categoryId = event.node.dataset.uid;
  }

  editSubCategory() {

    this.formSubmitted = true;

    const subCategoryModel = new SubCategoryModel();
    subCategoryModel.name = this.subCategoryForm.controls['name'].value;
    subCategoryModel.description = this.subCategoryForm.controls['description'].value;

    this.service.editSubCategory(this.subCategoryId, subCategoryModel).subscribe((response) => {

      this.formSubmitted = false;
      this.subCategoryForm.reset();
    },
      (error) => {
        console.log(error);
      });
  }

  get form() {

    return this.subCategoryForm.controls;
  }

  ngOnDestroy() {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getSubCategory(subCategoryId) {

    this.service.getSubCategory(subCategoryId).subscribe(response => {
      if (response) {
        this.subCategory = response;
        if (this.subCategory.name) {
          this.subCategoryForm?.controls['name'].setValue(this.subCategory.name);
        }
        if (this.subCategory.description) {
          this.subCategoryForm?.controls['description'].setValue(this.subCategory.description);
        }
      }
    }, (error) => {
      console.log(error);
    });
  }

  private formInitialization() {

    this.subCategoryForm = new FormGroup({
      parentCategory: new FormControl('',
        Validators.compose([Validators.required])),
      name: new FormControl('',
        Validators.compose([Validators.required])),
      description: new FormControl('',
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
