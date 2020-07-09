import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from 'src/app/shared/shared-module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductService } from './services/product.service';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxImageZoomModule } from 'ngx-image-zoom';


const components = [
  ProductListComponent,
  ProductDetailComponent,
  AddProductComponent,
  ProductsListComponent,
  EditProductComponent,
  DragAndDropDirective];

const modules = [ProductRoutingModule, SharedModule, NgImageSliderModule, NgxImageZoomModule];

const providers = [ProductService];

@NgModule({
  declarations: [components],
  imports: [modules],
  providers
})

export class ProductModule { }
