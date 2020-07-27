import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module';
import { SalesOrdersComponent } from './sales-orders.component';
import { SalesOrderRoutingModule } from './sales-routing.module';

const modules = [SharedModule,SalesOrderRoutingModule ];

const components = [SalesOrdersComponent];

const providers = [];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class SalesOrderProductModule { }
