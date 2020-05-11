import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FirstPageComponent } from "./pages/first-page/first-page.component";
import { CartViewComponent } from "./pages/cart-view/cart-view.component";

const routes: Routes = [
  {
    path: "firstPage",
    component: FirstPageComponent,
  },
  {
    path: "firstPage/cart-view",
    component: CartViewComponent,
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
    redirectTo: "/firstPage",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
