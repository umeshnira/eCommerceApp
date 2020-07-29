import { NgModule } from '@angular/core';
import { CustomersComponent } from './customers.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { SharedModule } from 'src/app/shared/shared-module';
import { CustomerRoutingModule } from './customer-routing.module';
const modules = [SharedModule, CustomerRoutingModule];

const components = [CustomersComponent,ViewCustomerComponent];

const providers = [];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class CustomerModule { }
