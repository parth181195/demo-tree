import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NumericTextBoxAllModule} from "@syncfusion/ej2-angular-inputs";
import {DialogModule} from "@syncfusion/ej2-angular-popups";
import {SparklineAllModule} from "@syncfusion/ej2-angular-charts";
import {ToolbarModule} from "@syncfusion/ej2-angular-navigations";
import {DropDownListAllModule, MultiSelectAllModule} from "@syncfusion/ej2-angular-dropdowns";
import {CommonModule} from "@angular/common";
import {TreeGridAllModule} from "@syncfusion/ej2-angular-treegrid";
import {DatePickerModule} from "@syncfusion/ej2-angular-calendars";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonAllModule, CheckBoxAllModule} from "@syncfusion/ej2-angular-buttons";
import {ToastModule} from "@syncfusion/ej2-angular-notifications";

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, HttpClientModule, ToastModule, TreeGridAllModule, NumericTextBoxAllModule, ToolbarModule, DropDownListAllModule, ButtonAllModule, DialogModule, MultiSelectAllModule, CheckBoxAllModule, ReactiveFormsModule, FormsModule, DatePickerModule, SparklineAllModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
