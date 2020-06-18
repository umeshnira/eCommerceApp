import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module';
import { HomeRoutingModule } from './home-routing.module';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { HomePageComponent } from './components/home-page.component';
import { FirstPageService } from './services/first-page.service';
import { LocalWhishListService } from './services/local-whish-list.service';
import { SaveForLaterService } from './services/save-for-later.service';

const modules = [HomeRoutingModule, SharedModule];

const components = [CartViewComponent, FirstPageComponent, WishlistComponent, HomePageComponent];

const providers = [FirstPageService, LocalWhishListService, SaveForLaterService];

@NgModule({
    imports: modules,
    declarations: components,
    exports: components,
    providers
})

export class HomeModule { }
