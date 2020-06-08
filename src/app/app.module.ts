import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstPageComponent } from './pages/first-page/first-page.component';
import { CartViewComponent } from './pages/cart-view/cart-view.component';
import { SharedModule } from './shared/shared-module';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { ProductDetailComponent } from './pages/product-list/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { DeliveryOptionsComponent } from './pages/payment/delivery-options/delivery-options.component';
import { PaymentMethodComponent } from './pages/payment/payment-method/payment-method.component';
import { OrderPlacedComponent } from './pages/payment/order-placed/order-placed.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ClientSignUpComponent } from './auth/client-signUp/client-sign-up/client-sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';

import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ProductListService } from './pages/product-list/services/product-list.service';
import { HttpClientModule } from '@angular/common/http';


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
    OrderPlacedComponent,
    SignUpComponent,
    ClientSignUpComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TreeViewModule,
    ListViewModule,
    CheckBoxModule,
    HttpClientModule],

  providers: [ProductListService],
  bootstrap: [AppComponent],
})
export class AppModule { }
