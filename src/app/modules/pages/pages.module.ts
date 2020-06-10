import { NgModule } from '@angular/core';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { FirstPageService } from './services/first-page.service';
import { LocalWhishListService } from './services/local-whish-list.service';
import { SaveForLaterService } from './services/save-for-later.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { PagesRoutingModule } from './pages-routing.module';

const modules = [PagesRoutingModule, SharedModule];

const components = [CartViewComponent, FirstPageComponent, WishlistComponent];

const providers = [FirstPageService, LocalWhishListService, SaveForLaterService];

@NgModule({
    imports: modules,
    declarations: components,
    exports: components,
    providers
})

export class PagesModule { }
