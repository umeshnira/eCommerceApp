import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { DashboardCategoryComponent } from './dashboard-category/dashboard-category.component';
import { DashboardSubCategoryComponent } from './dashboard-sub-category/dashboard-sub-category.component';
import { DashboardProductListComponent } from './dashboard-product-list/dashboard-product-list.component';
import { AddEditProductCategoryComponent } from './dashboard-category/add-edit-product-category/add-edit-product-category.component';
import { AddEditProductSubcategoryComponent } from './dashboard-sub-category/add-edit-product-subcategory/add-edit-product-subcategory.component';
import { AddProductListComponent } from './dashboard-product-list/add-product-list/add-product-list.component';
import { DashboardProductDetailComponent } from './dashboard-product-list/dashboard-product-detail/dashboard-product-detail.component';
import { OffersComponent } from './offers/offers.component';

const productRoutes = [
    {
        path: '',
        component: ProductsComponent
    },
    {
        path: 'categories',
        component: DashboardCategoryComponent
    },
    {
        path: 'add-categories',
        component: AddEditProductCategoryComponent
    },
    {
        path: 'edit-categories',
        component: AddEditProductCategoryComponent
    },
    {
        path: 'sub-categories',
        component: DashboardSubCategoryComponent
    },
    {
        path: 'add-sub-categories',
        component: AddEditProductSubcategoryComponent
    },
    {
        path: 'edit-sub-categories',
        component: AddEditProductSubcategoryComponent
    },
    {
        path: 'product-list',
        component: DashboardProductListComponent
    },
    {
        path: 'add-product-list',
        component: AddProductListComponent
    },
    {
        path: 'product-details',
        component: DashboardProductDetailComponent
    },
    {
        path: 'offers',
        component: OffersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(productRoutes)],
    exports: [RouterModule]
})

export class DashboardProductRoutingModule { }
