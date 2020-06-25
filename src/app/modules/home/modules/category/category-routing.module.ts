import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { ListCategoryComponent } from './components/category-list/category-list.component';
import { AddEditSubCategoryComponent } from './components/add-edit-sub-category/add-edit-sub-category.component';
import { ListSubCategoryComponent } from './components/sub-category-list/sub-category-list.component';

const routes = [
    {
        path: '',
        component: ListCategoryComponent
    },
    {
        path: 'create',
        component: AddEditCategoryComponent
    },
    {
        path: 'edit',
        component: AddEditCategoryComponent
    },
    {
        path: 'sub-categories/create',
        component: AddEditSubCategoryComponent
    },
    {
        path: 'sub-categories',
        component: ListSubCategoryComponent
    },
    {
        path: 'sub-categories/edit',
        component: AddEditSubCategoryComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CategoryRoutingModule { }
