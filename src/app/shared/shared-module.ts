import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderService } from './services/header.service';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { LocalCartStorageService } from './services/local-cart-storage.service';

const components = [HeaderComponent, FooterComponent];

const modules = [FormsModule, CommonModule, ReactiveFormsModule, TreeViewModule, ListViewModule, CheckBoxModule, DatePickerModule];

const providers = [HeaderService, LocalCartStorageService];

@NgModule({
  imports: modules,
  declarations: components,
  exports: [components, modules]
})

export class SharedModule {

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers
    };
  }
}

