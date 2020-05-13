import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
const components = [HeaderComponent, FooterComponent];
const modules = [FormsModule, CommonModule, RouterModule];
@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [components, modules],
  providers: [],
})
export class SharedModule {}
