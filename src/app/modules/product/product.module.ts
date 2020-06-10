import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from 'src/app/shared/shared-module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SubProductTypeService } from './services/subProductType.service';


const components = [ProductListComponent, ProductDetailComponent];

const modules = [ProductRoutingModule, SharedModule];

const providers = [SubProductTypeService];

@NgModule({
  declarations: [components],
  imports: [modules],
  providers
})

export class ProductModule {}
