import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module';
import { SalesOrdersComponent } from './sales-orders.component';
import { SalesOrderRoutingModule } from './sales-routing.module';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';

const modules = [SharedModule, SalesOrderRoutingModule];

const components = [SalesOrdersComponent, InvoiceDetailsComponent, OrderDetailsComponent, SalesReturnComponent, SalesInvoiceComponent];

const providers = [];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class SalesOrderProductModule { }
