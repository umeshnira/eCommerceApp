import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HeaderService } from './services/header.service';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { LocalCartStorageService } from './services/local-cart-storage.service';


const components = [HeaderComponent, FooterComponent];

const modules = [FormsModule, CommonModule, RouterModule, ReactiveFormsModule, TreeViewModule, ListViewModule, CheckBoxModule];

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

