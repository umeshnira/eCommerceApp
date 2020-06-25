import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryModel } from '../../models/category.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})

export class AddEditCategoryComponent implements OnInit, OnDestroy {

  categoryId: any;
  formSubmitted: boolean;
  isEdit: boolean;

  categoryModel: CategoryModel;
  category: CategoryModel;
  categoryForm: FormGroup;
  subscription: ISubscription;

  constructor(
    private service: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.formInitialization();
    if (this.route.snapshot.url[0].path === 'edit') {
      this.categoryId = this.route.snapshot.queryParams.categoryId;
      this.getCategory(this.categoryId);
      this.isEdit = true;
    }
  }

  addCategory() {

    this.formSubmitted = true;

    if (this.categoryForm.valid) {

      const categoryModel = new CategoryModel();
      categoryModel.name = this.categoryForm.controls['name'].value;
      categoryModel.description = this.categoryForm.controls['description'].value;
      categoryModel.inserted_by = 'Seller';

      this.subscription = this.service.addCategory(categoryModel).subscribe((response) => {

        this.formSubmitted = false;
        this.categoryForm.reset();
      },
        (error) => {
          console.log(error);
        });
    }
  }

  editCategory() {

    this.formSubmitted = true;

    if (this.categoryForm.valid) {

      const categoryModel = new CategoryModel();
      categoryModel.name = this.categoryForm.controls['name'].value;
      categoryModel.description = this.categoryForm.controls['description'].value;
      categoryModel.inserted_by = 'Seller';

      this.service.editCategory(this.categoryId, categoryModel).subscribe((response) => {

        this.formSubmitted = false;
        this.categoryForm.reset();
      },
        (error) => {
          console.log(error);
        });
    }
  }

  getCategory(categoryId) {

    this.service.getCategory(categoryId).subscribe(response => {
      if (response) {
        this.category = response;
        if (this.category.name) {
          this.categoryForm?.controls['name'].setValue(this.category.name);
        }
        if (this.category.description) {
          this.categoryForm?.controls['description'].setValue(this.category.description);
        }
      }
    }, (error) => {
      console.log(error);
    });
  }

  reset() {

    this.categoryForm.reset();
  }

  get form() {

    return this.categoryForm.controls;
  }

  ngOnDestroy() {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private formInitialization() {

    this.categoryForm = new FormGroup({
      name: new FormControl('',
        Validators.compose([Validators.required])),
      description: new FormControl('',
        Validators.compose([Validators.required])),
    });
  }


}
