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
import { OrderPlacedComponent } from "./pages/payment/order-placed/order-placed.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { ClientSignUpComponent } from "./auth/client-signUp/client-sign-up/client-sign-up.component";
import { KitchenTreeViewComponent } from "./pages/sampleTreeView/kitchen-tree-view/kitchen-tree-view.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/firstPage",
    pathMatch: "full",
  },
  {
    path: 'seller/signUp',
    component: SignUpComponent,
  },
  {
    path: 'kitchenTreeView',
    component: KitchenTreeViewComponent,
  },
  {
    path: 'client/signUp',
    component: ClientSignUpComponent,
  },
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
    path: "order-placed",
    component: OrderPlacedComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
