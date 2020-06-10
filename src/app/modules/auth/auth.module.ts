import { NgModule } from '@angular/core';
import { ClientSignUpComponent } from './components/client-signUp/client-sign-up.component';
import { SellerSignUpComponent } from './components/seller-signUp/sign-up.component';
import { RegistrationService } from './services/registration.service';
import { SharedModule } from 'src/app/shared/shared-module';
import { AuthRoutingModule } from './auth-routing.module';

const modules = [SharedModule, AuthRoutingModule];

const components = [ClientSignUpComponent, SellerSignUpComponent];

const providers = [RegistrationService];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class AuthModule { }
