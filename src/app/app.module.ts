import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared-module';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    AppRoutingModule,
    CoreModule.forRoot(),
    SharedModule.forRoot(),
  ],

  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
