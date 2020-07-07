import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module';
import { AuthRoutingModule } from './auth-routing.module';
import { ClientRegistrationComponent } from './components/client-registration/client-registration.component';
import { SellerRegistrationComponent } from './components/seller-registration/seller-registration.component';
import { RegistrationService } from './services/registration.service';
import { LoginComponent } from './components/login/login.component';
import { EncryptDecryptService } from './services/encrypt-decrypt.service';
import { LoginService } from './services/login.service';

const modules = [SharedModule, AuthRoutingModule];

const components = [ClientRegistrationComponent, SellerRegistrationComponent, LoginComponent];

const providers = [RegistrationService, EncryptDecryptService, LoginService];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class AuthModule { }
