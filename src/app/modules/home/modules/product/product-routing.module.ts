import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const productRoutes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
  },
  {
    path: 'details',
    component: ProductDetailComponent,
  },
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
