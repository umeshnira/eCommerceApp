import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module';
import { OffersComponent } from './offers.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { OfferRoutingModule } from './offer-routing.module';
import { AssignProductComponent } from './assign-product/assign-product.component';

const modules = [SharedModule, OfferRoutingModule];

const components = [OffersComponent,AddOfferComponent,AssignProductComponent];

const providers = [];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class OfferModule { }
