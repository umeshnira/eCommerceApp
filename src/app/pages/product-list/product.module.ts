import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductRoutingModule } from "./product-routing.module";
import { SharedModule } from "src/app/shared/shared-module";
const components = [ProductListComponent, ProductDetailComponent];
const modules = [ProductRoutingModule, SharedModule];
@NgModule({
  declarations: [components],
  imports: [modules],
  providers: [],
})
export class ProductModule {}
