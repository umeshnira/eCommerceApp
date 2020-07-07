import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientRegistrationComponent } from './components/client-registration/client-registration.component';
import { SellerRegistrationComponent } from './components/seller-registration/seller-registration.component';
import { LoginComponent } from './components/login/login.component';

const routes = [
    {
        path: '',
        redirectTo: 'seller/register',
        pathMatch: 'full',
    },
    {
        path: 'client/register',
        component: ClientRegistrationComponent
    },
    {
        path: 'seller/register',
        component: SellerRegistrationComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }
