import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from 'src/app/shared/shared-module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SubCategoryService } from './services/sub-category.service';
import { AddProductComponent } from './components/add-product/add-product.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProductService } from './services/product.service';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';


const components = [
  ProductListComponent,
  ProductDetailComponent,
  AddProductComponent,
  ProductsListComponent,
  EditProductComponent,
  DragAndDropDirective];

const modules = [ProductRoutingModule, SharedModule, TabsModule];

const providers = [SubCategoryService, ProductService];

@NgModule({
  declarations: [components],
  imports: [modules],
  providers
})

export class ProductModule { }
