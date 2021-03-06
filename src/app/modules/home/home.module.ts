import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { HomeLayoutComponent } from './layout/home-layout.component';
import { FirstPageService } from './services/first-page.service';
import { LocalWhishListService } from './services/local-whish-list.service';
import { SaveForLaterService } from './services/save-for-later.service';
import { CartService } from './services/cart.service';
import { WishListService } from './services/wish-list.service';
import { UserAccountComponent } from './components/user-account/user-account.component';


const modules = [HomeRoutingModule, SharedModule];

const components = [CartViewComponent, HomePageComponent, WishlistComponent, HomeLayoutComponent,UserAccountComponent];

const providers = [FirstPageService, LocalWhishListService, SaveForLaterService, CartService, WishListService];

@NgModule({
    imports: modules,
    declarations: components,
    exports: components,
    providers
})

export class HomeModule { }
