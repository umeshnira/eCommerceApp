import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { HomeViewGuard } from 'src/app/core/guards/home-view-guard.guard';

const routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
            {
                path: '',
                component: HomePageComponent,
                // canActivate: [HomeViewGuard],
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
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }
