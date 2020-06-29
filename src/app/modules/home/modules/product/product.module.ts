import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from 'src/app/shared/shared-module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SubProductTypeService } from './services/subProductType.service';
import { AddProductComponent } from './components/add-product/add-product.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SubCategoryService } from '../category/services/sub-category.service';
import { ProductService } from './services/product.service';


const components = [ProductListComponent, ProductDetailComponent, AddProductComponent];

const modules = [ProductRoutingModule, SharedModule, TabsModule];

const providers = [SubProductTypeService, SubCategoryService,ProductService];

@NgModule({
  declarations: [components, AddProductComponent],
  imports: [modules],
  providers
})

export class ProductModule {}
