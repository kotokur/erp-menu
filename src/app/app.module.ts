import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import {
  NzAvatarModule,
  NzBadgeModule,
  NzButtonModule,
  NzDropDownModule,
  NzEmptyModule, NzInputNumberModule,
  NzTreeModule
} from 'ng-zorro-antd';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { AvatarComponent } from './components/avatar/avatar.component';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  DownOutline,
  NotificationOutline,
  PlusCircleOutline,
  FolderOutline,
  FolderOpenOutline,
  FileOutline,
  MoreOutline,
  PlusOutline,
  EditOutline,
  DeleteOutline
} from '@ant-design/icons-angular/icons';
import { ListComponent } from './components/list/list/list.component';
import { ListPageComponent } from './components/list/list-page/list-page.component';
import { AddSectionComponent } from './components/add-section/add-section.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddButtonComponent } from './components/list/add-button/add-button.component';
import {ErpFormsModule} from './libs/erp-forms/erp-forms.module';

registerLocaleData(en);

const icons: IconDefinition[] = [
  DownOutline,
  NotificationOutline,
  PlusCircleOutline,
  FolderOutline,
  FolderOpenOutline,
  FileOutline,
  MoreOutline,
  PlusOutline,
  EditOutline,
  DeleteOutline
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,
    AvatarComponent,
    ListComponent,
    ListPageComponent,
    AddSectionComponent,
    AddItemComponent,
    PageNotFoundComponent,
    AddButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NzBadgeModule,
    NzAvatarModule,
    NzIconModule.forRoot(icons),
    NzButtonModule,
    NzEmptyModule,
    NzTreeModule,
    NzDropDownModule,
    NzInputNumberModule,
    ErpFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
