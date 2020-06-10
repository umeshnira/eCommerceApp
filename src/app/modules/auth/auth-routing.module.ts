import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientSignUpComponent } from './components/client-signUp/client-sign-up.component';
import { SellerSignUpComponent } from './components/seller-signUp/sign-up.component';

const routes = [
    {
        path: 'client/signUp',
        component: ClientSignUpComponent
    },
    {
        path: 'seller/signUp',
        component: SellerSignUpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }
