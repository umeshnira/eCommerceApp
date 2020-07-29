import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CustomersComponent } from "./customers.component";
import { ViewCustomerComponent } from "./view-customer/view-customer.component";


const customerRoutes = [
    {
        path: '',
        component: CustomersComponent
    },
    {
        path: 'view-customer',
        component: ViewCustomerComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(customerRoutes)],
    exports: [RouterModule]
})

export class CustomerRoutingModule { }
