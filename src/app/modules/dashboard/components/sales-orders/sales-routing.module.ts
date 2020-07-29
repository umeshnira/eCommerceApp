import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SalesOrdersComponent } from './sales-orders.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesTransactionsComponent } from './sales-transactions/sales-transactions.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const salesRoutes = [
    {
        path: 'orders',
        component: SalesOrdersComponent
    },
    {
        path: 'order-details',
        component: OrderDetailsComponent
    },
    {
        path: 'return-refund',
        component: SalesReturnComponent
    },
    {
        path: 'invoice',
        component: SalesInvoiceComponent
    },
    {
        path: 'invoice-details',
        component: InvoiceDetailsComponent
    },
    {
        path: 'transactions',
        component: SalesTransactionsComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(salesRoutes)],
    exports: [RouterModule]
})

export class SalesOrderRoutingModule { }
