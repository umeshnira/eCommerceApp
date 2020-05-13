import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FirstPageComponent } from "./pages/first-page/first-page.component";
import { CartViewComponent } from "./pages/cart-view/cart-view.component";
import { SharedModule } from "./shared/shared-module";
import { WishlistComponent } from "./pages/wishlist/wishlist.component";
import { ProductDetailComponent } from "./pages/product-list/product-detail/product-detail.component";
import { ProductListComponent } from "./pages/product-list/product-list.component";
@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    CartViewComponent,
    WishlistComponent,
    ProductDetailComponent,
    ProductListComponent
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
