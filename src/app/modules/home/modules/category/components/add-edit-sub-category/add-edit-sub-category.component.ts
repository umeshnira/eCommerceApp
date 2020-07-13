import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SubCategoryModel } from '../../models/sub-category.model';
import { SubCategoryService } from '../../../../../../shared/services/sub-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/shared/models/constants';
import { CategoryTreeViewModel } from '../../models/category-tree-view.model';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { Status } from 'src/app/shared/enums/user-status.enum';

@Component({
  selector: 'app-add-edit-sub-category',
  templateUrl: './add-edit-sub-category.component.html',
  styleUrls: ['./add-edit-sub-category.component.css']
})

export class AddEditSubCategoryComponent implements OnInit, OnDestroy {

  subCategoryId: number;
  categoryId: number;
  formSubmitted: boolean;
  isEdit: boolean;

  categories: CategoryTreeViewModel;
  subCategory: SubCategoryModel;
  field: Object;
  subCategoryForm: FormGroup;

  addSubCategorySubscription: ISubscription;
  getCategoriesSubscription: ISubscription;
  editSubCategorySubscription: ISubscription;
  getSubCategorySubscription: ISubscription;

  get form() {
    return this.subCategoryForm.controls;
  }

  constructor(
    private service: SubCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.subCategoryFormInitialization();
    this.getCategories();

    if (this.route.snapshot.url[1].path === 'edit') {
      this.subCategoryId = this.route.snapshot.queryParams.subCategoryId;
      this.getSubCategory(this.subCategoryId);
      this.isEdit = true;
    }
  }

  addSubCategory() {
    this.formSubmitted = true;

    if (this.subCategoryForm.valid) {
      const subCategoryModel = this.prepareSubCategoryRequestModel();

      this.addSubCategorySubscription = this.service.addSubCategory(subCategoryModel)
        .subscribe((response) => {

          this.formSubmitted = false;
          this.subCategoryForm.reset();
        },
          (error) => {
            this.toastr.error('', error.error.message);
          });
    }
  }

  categoryNodeclicked(event) {
    const value = event.node.textContent;
    this.subCategoryForm?.controls['parentCategory'].setValue(value);
    this.categoryId = Number(event.node.dataset.uid);
  }

  navigateToHomePage() {
    this.router.navigate([RoutePathConfig.Home]);
  }

  editSubCategory() {
    this.formSubmitted = true;

    const subCategoryModel = this.prepareSubCategoryRequestModel();

    if (this.subCategoryId && subCategoryModel) {
      this.editSubCategorySubscription = this.service.editSubCategory(this.subCategoryId, subCategoryModel)
        .subscribe((response) => {

          this.formSubmitted = false;
          this.subCategoryForm.reset();
          this.router.navigate([RoutePathConfig.Home]);
        },
          (error) => {
            this.toastr.error('', error.error.message);
          });
    }
  }

  ngOnDestroy() {
    if (this.addSubCategorySubscription) {
      this.addSubCategorySubscription.unsubscribe();
    }
    if (this.editSubCategorySubscription) {
      this.editSubCategorySubscription.unsubscribe();
    }
    if (this.getSubCategorySubscription) {
      this.getSubCategorySubscription.unsubscribe();
    }
    if (this.getCategoriesSubscription) {
      this.getCategoriesSubscription.unsubscribe();
    }
  }

  prepareSubCategoryRequestModel() {
    const subCategoryModel = new SubCategoryModel();
    subCategoryModel.parent_category_id = this.categoryId;
    subCategoryModel.name = this.subCategoryForm?.controls['name'].value;
    subCategoryModel.description = this.subCategoryForm?.controls['description'].value;

    return subCategoryModel;
  }

  private getSubCategory(subCategoryId) {
    this.getSubCategorySubscription = this.service.getSubCategory(subCategoryId).subscribe(response => {
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
      this.toastr.error('', error.error.message);
    });
  }

  private subCategoryFormInitialization() {
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
        this.toastr.error('', error.error.message);
      }
    );
  }

}
