import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { HttpBaseService } from './services/http-base-service.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { ViewGuard } from './guards/view-guard.guard';

const providers = [HttpBaseService, CookieService, AuthService, ViewGuard];

const modules = [CommonModule, BrowserModule, HttpClientModule];

@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules]
})

export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers
    };
  }
}
