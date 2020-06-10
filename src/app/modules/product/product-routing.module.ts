import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


const productRoutes: Routes = [
  {
    path: 'productList',
    component: ProductListComponent,
  },
  {
    path: 'productDetail/:id',
    component: ProductDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule],
})

export class ProductRoutingModule {}
