import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductRoutingModule } from "./product-routing.module";
import { SharedModule } from "src/app/shared/shared-module";
import { TreeViewModule } from "@syncfusion/ej2-angular-navigations";
import { HttpClientModule, HttpClient } from "@angular/common/http";


const components = [ProductListComponent, ProductDetailComponent];
const modules = [ProductRoutingModule, SharedModule, TreeViewModule];
@NgModule({
  declarations: [components],
  imports: [HttpClientModule, HttpClient],
  providers: [],
})
export class ProductModule {}
