import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FirstPageComponent } from "./pages/first-page/first-page.component";
import { CartViewComponent } from "./pages/cart-view/cart-view.component";
import { WishlistComponent } from "./pages/wishlist/wishlist.component";

const routes: Routes = [
  {
    path: "first-page",
    component: FirstPageComponent,
  },
  {
    path: "cart-view",
    component: CartViewComponent,
  },
  {
    path: "wishlist",
    component: WishlistComponent,
  },
  {
    path: "product-list",
    loadChildren: () =>
      import("./pages/product-list/product.module").then(
        (m) => m.ProductModule
      ),
  },

  {
    path: "",
    redirectTo: "/first-page",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
