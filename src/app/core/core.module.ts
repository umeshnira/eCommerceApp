import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const providers = [];

const modules = [CommonModule, HttpClientModule];

@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules]
})

export class CoreModule {

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers
    };
  }
}
