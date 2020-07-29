import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DasboardComponent } from './components/dashboard/dasboard.component';
import { DashboardSidebarComponent } from './layout/dashboard-sidebar.component';
import { FirstPageService } from '../home/services/first-page.service';
import { SharedModule } from 'src/app/shared/shared-module';

const modules = [SharedModule, DashboardRoutingModule];

const components = [DasboardComponent, DashboardSidebarComponent];

const providers = [FirstPageService];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class DashboardModule { }
