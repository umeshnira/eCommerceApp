import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared-module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 30000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    CoreModule.forRoot(),
    SharedModule.forRoot(),
  ],

  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
