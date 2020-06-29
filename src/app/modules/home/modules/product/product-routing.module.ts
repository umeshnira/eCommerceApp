import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AddProductComponent } from './components/add-product/add-product.component';

const productRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  // {
  //   path: ':id',
  //   component: ProductDetailComponent,
  // },
  {
    path: 'add',
    component: AddProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule],
})

export class ProductRoutingModule { }
