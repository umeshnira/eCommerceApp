import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module';
import { AuthRoutingModule } from './auth-routing.module';
import { ClientRegistrationComponent } from './components/client-registration/client-registration.component';
import { SellerRegistrationComponent } from './components/seller-registration/seller-registration.component';
import { RegistrationService } from './services/registration.service';

const modules = [SharedModule, AuthRoutingModule];

const components = [ClientRegistrationComponent, SellerRegistrationComponent];

const providers = [RegistrationService];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class AuthModule { }
