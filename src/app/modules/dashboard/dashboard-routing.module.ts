import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardSidebarComponent } from './layout/dashboard-sidebar.component';
import { DasboardComponent } from './components/dashboard/dasboard.component';
import { ReviewComponent } from './components/review/review.component';

const dashboardRoutes = [
    {
        path: '',
        component: DashboardSidebarComponent,
        children: [
            {
                path: '',
                component: DasboardComponent
            },
            {
                path: 'products',
                loadChildren: () => import('./components/products/dashboard-products.module').then(m => m.DashboardProductModule),
            },
            {
                path: 'sales',
                loadChildren: () => import('./components/sales-orders/sales.module').then(m => m.SalesOrderProductModule),
            },
            {
                path: 'seller',
                loadChildren: () => import('./components/seller/seller.module').then(m => m.SellerModule),
            },
            {
                path: 'coupons',
                loadChildren: () => import('./components/coupons/coupons.module').then(m => m.CouponModule),
            },
            {
                path: 'reviews',
                component: ReviewComponent
            },
            {
                path: 'customers',
                loadChildren: () => import('./components/customers/customer.module').then(m => m.CustomerModule),
            },
            {
                path: 'subscriptions',
                loadChildren: () => import('./components/subscription/subscription.module').then(m => m.SubscriptionModule),
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule { }
