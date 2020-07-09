import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryService } from '../../../../shared/services/category.service';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { ListCategoryComponent } from './components/category-list/category-list.component';
import { AddEditSubCategoryComponent } from './components/add-edit-sub-category/add-edit-sub-category.component';
import { ListSubCategoryComponent } from './components/sub-category-list/sub-category-list.component';
import { SubCategoryService } from '../../../../shared/services/sub-category.service';
import { ToastrModule } from 'ngx-toastr';

const modules = [CategoryRoutingModule, SharedModule, ToastrModule];

const components = [
    AddEditCategoryComponent,
    ListCategoryComponent,
    AddEditSubCategoryComponent,
    ListSubCategoryComponent
];

const providers = [CategoryService, SubCategoryService];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class CategoryModule { }
