import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { TreeViewModule } from "@syncfusion/ej2-angular-navigations";
import { ListViewModule } from "@syncfusion/ej2-angular-lists";
import { CheckBoxModule } from "@syncfusion/ej2-angular-buttons";
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";
import { LocalCartStorageService } from "./services/local-cart-storage.service";
import { TabsModule } from "ngx-bootstrap/tabs";
import { CategoryService } from "./services/category.service";
import { SubCategoryService } from "./services/sub-category.service";
import { DragAndDropDirective } from "./directives/drag-and-drop.directive";
import { GenericStateManagerService } from "./services/generic-state-manager.service";
import { SellerService } from "./services/seller.service";
import { RouterModule } from "@angular/router";
import { CustomConfirmComponent } from "./components/custom-confirm/custom-confirm.component";
import { DataTablesModule } from "angular-datatables";

const components = [
  HeaderComponent,
  FooterComponent,
  DragAndDropDirective,
  CustomConfirmComponent,
];

const modules = [
  FormsModule,
  CommonModule,
  DataTablesModule,
  ReactiveFormsModule,
  TreeViewModule,
  ListViewModule,
  CheckBoxModule,
  DatePickerModule,
  TabsModule,
  RouterModule,
];

const providers = [
  LocalCartStorageService,
  CategoryService,
  SubCategoryService,
  GenericStateManagerService,
  SellerService,
];

@NgModule({
  imports: modules,
  declarations: components,
  exports: [components, modules],
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers,
    };
  }
}
