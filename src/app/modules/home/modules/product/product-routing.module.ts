import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const productRoutes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
  },
  // {
  //   path: '',
  //   component: ProductListComponent,
  // },
  // {
  //   path: ':id',
  //   component: ProductDetailComponent,
  // },
  {
    path: 'add',
    component: AddProductComponent
  },
  {
    path: 'edit',
    component: EditProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule],
})

export class ProductRoutingModule { }
