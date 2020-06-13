import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import {NzAvatarModule, NzBadgeModule, NzButtonModule, NzEmptyModule} from 'ng-zorro-antd';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { AvatarComponent } from './components/avatar/avatar.component';
import { IconDefinition } from '@ant-design/icons-angular';
import { DownOutline, NotificationOutline, PlusCircleOutline } from '@ant-design/icons-angular/icons';
import { ListComponent } from './components/list/list/list.component';
import { ListPageComponent } from './components/list/list-page/list-page.component';
import { AddSectionComponent } from './components/add-section/add-section.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddButtonComponent } from './components/list/add-button/add-button.component';

registerLocaleData(en);

const icons: IconDefinition[] = [ DownOutline, NotificationOutline, PlusCircleOutline ];

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
    AddButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NzBadgeModule,
    NzAvatarModule,
    NzIconModule.forRoot(icons),
    NzButtonModule,
    NzEmptyModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
