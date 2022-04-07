import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OffersComponent } from './offers.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { AssignProductComponent } from './assign-product/assign-product.component';

const offerRoutes = [
    {
        path: '',
        component: OffersComponent
    },
    {
        path: 'add',
        component: AddOfferComponent
    },
    {
        path: 'edit/:id',
        component: AddOfferComponent
    },
    {
        path: 'assign-product/:id',
        component: AssignProductComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(offerRoutes)],
    exports: [RouterModule]
})

export class OfferRoutingModule { }
