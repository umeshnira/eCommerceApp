import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { DashboardProductRoutingModule } from './dashboard-products-routing.module';
import { DashboardCategoryComponent } from './dashboard-category/dashboard-category.component';
import { FirstPageService } from 'src/app/modules/home/services/first-page.service';
import { ProductService } from 'src/app/modules/home/modules/product/services/product.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { DashboardSubCategoryComponent } from './dashboard-sub-category/dashboard-sub-category.component';
import { DashboardProductListComponent } from './dashboard-product-list/dashboard-product-list.component';
import { AddEditProductCategoryComponent } from './dashboard-category/add-edit-product-category/add-edit-product-category.component';
import { AddEditProductSubcategoryComponent } from './dashboard-sub-category/add-edit-product-subcategory/add-edit-product-subcategory.component';
import { AddProductListComponent } from './dashboard-product-list/add-product-list/add-product-list.component';
import { ArchwizardModule } from 'angular-archwizard';
import { DashboardProductDetailComponent } from './dashboard-product-list/dashboard-product-detail/dashboard-product-detail.component';
import { CartService } from 'src/app/modules/home/services/cart.service';
import { OfferService } from './services/offer.service';
import {  BsModalService } from "ngx-bootstrap/modal";

const modules = [SharedModule, DashboardProductRoutingModule, ArchwizardModule
];
const components = [ProductsComponent, DashboardCategoryComponent, AddProductListComponent,
    AddEditProductCategoryComponent, AddEditProductSubcategoryComponent, DashboardSubCategoryComponent,
    DashboardProductListComponent, DashboardProductDetailComponent];

const providers = [FirstPageService, ProductService, CartService, OfferService,BsModalService];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class DashboardProductModule { }
