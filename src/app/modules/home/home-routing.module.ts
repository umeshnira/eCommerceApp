import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { UserAccountComponent } from './components/user-account/user-account.component';

const routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
            {
                path: '',
                component: HomePageComponent,
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
                loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule),
            },
            {
                path: 'payment',
                loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule),
            },
            {
                path: 'products',
                loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
            },
            {
                path: 'categories',
                loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule),
            },
            {
                path: 'user-account',
               component:UserAccountComponent
            }
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }
