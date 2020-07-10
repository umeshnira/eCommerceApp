import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { LocalCartStorageService } from './services/local-cart-storage.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CategoryService } from './services/category.service';
import { SubCategoryService } from './services/sub-category.service';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';



const components = [HeaderComponent, FooterComponent, DragAndDropDirective];

const modules = [FormsModule, CommonModule, ReactiveFormsModule, TreeViewModule, ListViewModule,
                 CheckBoxModule, DatePickerModule, TabsModule];

const providers = [LocalCartStorageService, CategoryService, SubCategoryService];

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

