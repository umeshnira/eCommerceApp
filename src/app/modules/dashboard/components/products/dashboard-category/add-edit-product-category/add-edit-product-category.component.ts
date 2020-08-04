import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryModel } from 'src/app/modules/home/modules/category/models/category.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { CustomFormValidator } from 'src/app/shared/validators/custom-form.validator';
import { SubscriptionLike as ISubscription } from 'rxjs';
@Component({
  selector: 'app-add-edit-product-category',
  templateUrl: './add-edit-product-category.component.html',
  styleUrls: ['./add-edit-product-category.component.css']
})
export class AddEditProductCategoryComponent implements OnInit, OnDestroy {
  categoryId: number;
  formSubmitted: boolean;
  isEdit: boolean;
  category: CategoryModel;
  categoryForm: FormGroup;
  addCategorySubscription: ISubscription;
  editCategorySubscription: ISubscription;
  getCategorySubscription: ISubscription;

  get form() {
    return this.categoryForm.controls;
  }

  constructor(
    private service: CategoryService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryFormInitialization();

    if (this.route.snapshot.url[1].path === 'edit') {
      this.categoryId = this.route.snapshot.queryParams.categoryId;
      this.getCategoryDetails(this.categoryId);
      this.isEdit = true;
    }
  }

  addCategory() {
    this.formSubmitted = true;

    if (this.categoryForm.valid) {
      const categoryModel = this.prepareCategoryRequestModel();

      if (categoryModel) {

        this.addCategorySubscription = this.service.addCategory(categoryModel)
          .subscribe((response) => {

            this.formSubmitted = false;
            this.categoryForm.reset();
            this.toastr.success('Category Added Successfully', 'Success');
            const path = `${RoutePathConfig.Dashboard}/${RoutePathConfig.Products}/${RoutePathConfig.CategoryList}`;
            this.router.navigate([path]);
          },
            (error) => {
              this.toastr.error('', error.error.message);
            });
      }
    }
  }

  editCategory() {
    this.formSubmitted = true;

    if (this.categoryForm.valid) {
      const categoryModel = this.prepareCategoryRequestModel();

      if (categoryModel && this.categoryId) {
        this.editCategorySubscription = this.service.editCategory(this.categoryId, categoryModel)
          .subscribe((response) => {

            this.formSubmitted = false;
            this.categoryForm.reset();
            this.toastr.success('Category Updated Successfully', 'Success');
            const path = `${RoutePathConfig.Dashboard}/${RoutePathConfig.Products}/${RoutePathConfig.CategoryList}`;
            this.router.navigate([path]);
          },
            (error) => {
              this.toastr.error('', error.error.message);
            });
      }
    }
  }

  cancel() {
    const path = `${RoutePathConfig.Dashboard}/${RoutePathConfig.Products}/${RoutePathConfig.CategoryList}`;
    this.router.navigate([path]);
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

  private prepareCategoryRequestModel() {
    const categoryModel = new CategoryModel();
    categoryModel.name = this.categoryForm?.controls['name'].value;
    categoryModel.description = this.categoryForm?.controls['description'].value;
    if (this.categoryForm?.controls['hasSubCategory']?.value !== '') {
      categoryModel.hasSubCategory = this.categoryForm?.controls['hasSubCategory']?.value;
    }

    return categoryModel;
  }

  private getCategoryDetails(categoryId: number) {
    if (categoryId) {

      this.getCategorySubscription = this.service.getCategory(categoryId)
        .subscribe(response => {

          if (response) {
            this.category = response;
            this.addCategoryDetailsToForm();
          }

        }, (error) => {
          this.toastr.error('', error.error.message);
        });
    }
  }

  private addCategoryDetailsToForm() {
    if (this.category) {
      this.categoryForm?.controls['name'].setValue(this.category.name);
      this.categoryForm?.controls['description'].setValue(this.category.description);
      this.categoryForm?.controls['hasSubCategory'].setValue(this.category.hasSubCategory);

    }
  }

  private categoryFormInitialization() {
    this.categoryForm = new FormGroup({
      name: new FormControl('',
        Validators.compose([Validators.required, CustomFormValidator.cannotContainSpace])),
      description: new FormControl('',
        Validators.compose([Validators.required, CustomFormValidator.cannotContainSpace])),
        hasSubCategory: new FormControl(''
      ),

    });
  }

}
