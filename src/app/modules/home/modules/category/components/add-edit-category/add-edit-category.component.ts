import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryModel } from '../../models/category.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Status } from 'src/app/shared/enums/user-status.enum';

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
  addCategorySubscription: ISubscription;
  editCategorySubscription: ISubscription;
  getCategorySubscription: ISubscription;

  constructor(
    private service: CategoryService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
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
      categoryModel.status = Status.Active;
      categoryModel.created_by = 'Admin';

      this.addCategorySubscription = this.service.addCategory(categoryModel).subscribe((response) => {

        this.formSubmitted = false;
        this.categoryForm.reset();
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
  }

  editCategory() {

    this.formSubmitted = true;

    if (this.categoryForm.valid) {

      const categoryModel = new CategoryModel();
      categoryModel.name = this.categoryForm.controls['name'].value;
      categoryModel.description = this.categoryForm.controls['description'].value;
      categoryModel.created_by = 'Admin';

      this.editCategorySubscription = this.service.editCategory(this.categoryId, categoryModel).subscribe((response) => {

        this.formSubmitted = false;
        this.categoryForm.reset();
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
  }

  reset() {

    this.router.navigate(['home']);
  }

  get form() {

    return this.categoryForm.controls;
  }

  ngOnDestroy() {

    if (this.addCategorySubscription) {
      this.addCategorySubscription.unsubscribe();
    }
    if (this.editCategorySubscription) {
      this.editCategorySubscription.unsubscribe();
    }
    if (this.getCategorySubscription) {
      this.getCategorySubscription.unsubscribe();
    }
  }

  private getCategory(categoryId) {

    this.getCategorySubscription = this.service.getCategory(categoryId).subscribe(response => {
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
      if (error instanceof HttpErrorResponse) {
        this.toastr.error('', error.error.message);
        console.log(error);
      } else {
        this.toastr.error('', error);
      }
    });
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
