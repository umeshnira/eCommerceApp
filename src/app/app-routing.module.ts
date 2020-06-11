import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'order',
    loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: 'payment',
    loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule),
  },
  {
    path: 'product',
    loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
  },
  {
    path: '',
    redirectTo: 'pages/homePage',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'pages/homePage'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
