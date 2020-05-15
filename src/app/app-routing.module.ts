import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FirstPageComponent } from "./pages/first-page/first-page.component";
import { CartViewComponent } from "./pages/cart-view/cart-view.component";
import { ProductDetailComponent } from "./pages/product-list/product-detail/product-detail.component";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { WishlistComponent } from "./pages/wishlist/wishlist.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { PaymentComponent } from "./pages/payment/payment.component";
import { DeliveryOptionsComponent } from "./pages/payment/delivery-options/delivery-options.component";
import { PaymentMethodComponent } from "./pages/payment/payment-method/payment-method.component";

const routes: Routes = [
  {
    path: "firstPage",
    component: FirstPageComponent,
  },
  {
    path: "cartView",
    component: CartViewComponent,
  },
  {
    path: "firstPage/cartView",
    component: CartViewComponent,
  },

  {
    path: "firstPage/DetailsPage",
    component: ProductDetailComponent,
  },
  {
    path: "firstPage/productList",
    component: ProductListComponent,
  },
  {
    path: "wishlist",
    component: WishlistComponent,
  },

  {
    path: "wishlist/cartView",
    component: CartViewComponent,
  },
  {
    path: "orders",
    component: OrdersComponent,
  },
  {
    path: "payment",
    component: PaymentComponent,
  },
  {
    path: "payment/delivery-option",
    component: DeliveryOptionsComponent,
  },
  {
    path: "payment/payment-method",
    component: PaymentMethodComponent,
  },
  {
    path: "",
    redirectTo: "/firstPage",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
