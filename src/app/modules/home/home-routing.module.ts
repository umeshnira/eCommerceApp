import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes = [
    {
        path: '',
        component: HomePageComponent,
        children: [
            {
                path: 'firstPage',
                component: FirstPageComponent
            },
            {
                path: 'cart',
                component: CartViewComponent
            },
            {
                path: 'wishlist',
                component: WishlistComponent
            },
            {
                path: 'order',
                loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule),
            },
            {
                path: 'payment',
                loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentModule),
            },
            {
                path: 'products',
                loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }
