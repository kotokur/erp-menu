import { NgModule } from '@angular/core';
import {AddFormHeaderComponent} from './components/add-form-header/add-form-header.component';
import {FormComponent} from './components/form/form.component';
import {FormControlComponent} from './components/form-control/form-control.component';
import {FormSaveButtonComponent} from './components/form-save-button/form-save-button.component';
import {NzButtonModule, NzFormModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AddFormHeaderComponent,
    FormComponent,
    FormControlComponent,
    FormSaveButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzButtonModule
  ],
  exports: [
    FormComponent,
    FormControlComponent,
    FormSaveButtonComponent
  ]
})
export class ErpFormsModule { }
