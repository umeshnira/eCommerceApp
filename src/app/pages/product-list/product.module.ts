import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductRoutingModule } from "./product-routing.module";
const components = [ProductListComponent, ProductDetailComponent];
const modules = [ProductRoutingModule];
@NgModule({
  declarations: [components],
  imports: [modules],
  providers: [],
})
export class ProductModule {}
