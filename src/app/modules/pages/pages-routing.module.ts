import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';


const routes = [
    {
        path: 'firstPage',
        component: FirstPageComponent
    },
    {
        path: 'cart-View',
        component: CartViewComponent
    },
    {
        path: 'wish-list',
        component: WishlistComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }
