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
import { OrdersComponent } from './pages/orders/orders.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { DeliveryOptionsComponent } from './pages/payment/delivery-options/delivery-options.component';
import { PaymentMethodComponent } from './pages/payment/payment-method/payment-method.component';
@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    CartViewComponent,
    WishlistComponent,
    ProductDetailComponent,
    ProductListComponent,
    OrdersComponent,
    PaymentComponent,
    DeliveryOptionsComponent,
    PaymentMethodComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
