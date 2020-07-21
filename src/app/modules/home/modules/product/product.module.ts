import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from 'src/app/shared/shared-module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductService } from './services/product.service';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const components = [
  ProductDetailComponent,
  AddProductComponent,
  ProductsListComponent,
  EditProductComponent,
];

const modules = [ProductRoutingModule, SharedModule];

const providers = [ProductService];

@NgModule({
  declarations: [components],
  imports: [modules],
  providers
})

export class ProductModule { }
