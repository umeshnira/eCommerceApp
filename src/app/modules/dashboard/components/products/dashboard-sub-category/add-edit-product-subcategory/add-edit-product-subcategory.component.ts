import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryTreeViewModel } from 'src/app/modules/home/modules/category/models/category-tree-view.model';
import { SubCategoryModel } from 'src/app/modules/home/modules/category/models/sub-category.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { CategoryModel } from 'src/app/modules/home/modules/category/models/category.model';
import { CategoryService } from 'src/app/shared/services/category.service';
@Component({
  selector: 'app-add-edit-product-subcategory',
  templateUrl: './add-edit-product-subcategory.component.html',
  styleUrls: ['./add-edit-product-subcategory.component.css']
})
export class AddEditProductSubcategoryComponent implements OnInit, OnDestroy {

  subCategoryId: number;
  categoryId: number;
  categoryName: string;
  formSubmitted: boolean;
  isEdit: boolean;

  categories: CategoryTreeViewModel[];
  subCategory: SubCategoryModel;
  field: Object;
  subCategoryForm: FormGroup;
  categoryList: CategoryModel[];
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
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.subCategoryFormInitialization();
    this.getCategories();
    this.getCategoryList();
    if (this.route.snapshot.url[0].path === 'edit-sub-categories') {
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
          this.toastr.success('SubCategory Added Successfully', 'Success');
          this.router.navigate([`${RoutePathConfig.Home}/${RoutePathConfig.SubCategoryList}`]);
        },
          (error) => {
            this.toastr.error('', error.error.message);
          });
    }
  }

  categoryNodeclicked(event) {
    this.categoryId = Number(event.node.dataset.uid);
    const category = this.getCategoryName(this.categories, this.categoryId);
    this.categoryName = category.name;
    this.subCategoryForm?.controls['parentCategory'].setValue(this.categoryName);
  }

  navigateToHomePage() {
    const path = `${RoutePathConfig.Dashboard}/${RoutePathConfig.Products}/${RoutePathConfig.SubCategory}`;
    this.router.navigate([path]);
  }

  editSubCategory() {
    this.formSubmitted = true;

    const subCategoryModel = this.prepareSubCategoryRequestModel();

    if (this.subCategoryId && subCategoryModel) {
      this.editSubCategorySubscription = this.service.editSubCategory(this.subCategoryId, subCategoryModel)
        .subscribe((response) => {
          this.formSubmitted = false;
          this.subCategoryForm.reset();
          this.toastr.success('SubCategory Updated Successfully', 'Success');
          const path = `${RoutePathConfig.Dashboard}/${RoutePathConfig.Products}/${RoutePathConfig.SubCategory}`;
          this.router.navigate([path]);
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

  private prepareSubCategoryRequestModel() {
    const subCategoryModel = new SubCategoryModel();
    subCategoryModel.parent_category_id = this.categoryId;
    subCategoryModel.name = this.subCategoryForm?.controls['name'].value;
    subCategoryModel.description = this.subCategoryForm?.controls['description'].value;

    return subCategoryModel;
  }

  private getCategoryName(categories: Array<CategoryTreeViewModel>, id: number) {
    if (categories) {
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].id === id) {
          return categories[i];
        }
        const hasFoundCategory = this.getCategoryName(categories[i].subCategories, id);
        if (hasFoundCategory) {
          return hasFoundCategory;
        }
      }
    }
  }
  private getCategoryList() {
    this.getCategoriesSubscription = this.categoryService.getCategories().subscribe((response) => {
      this.categoryList = response;
      this.categoryList = this.categoryList.filter(x => x.parent_category_id === null);
    },
      (error) => {
        this.toastr.error('', error.error.message);
      }
    );
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


  // getCategoryId(event) {
  //   this.categoryId = event.target.value;
  //   this.getSubCategoryList();
  //   if (this.isSeller) {
  //     this.getProductsByCategoryId(this.categoryId);
  //   } else {
  //     this.getProductsByCategoryId(this.categoryId);
  //   }

  // }
}
