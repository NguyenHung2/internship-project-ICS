import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { DashboardComponent } from './layouts/component/dashboard/dashboard.component';
import { ThietbiComponent } from './layouts/component/danhmuc/thietbi/thietbi.component';
import { NentangComponent } from './layouts/component/danhmuc/nentang/nentang.component';
import { QuanlysubnetComponent } from './layouts/component/danhmuc/quanlysubnet/quanlysubnet.component';
import { QuanlygoiComponent } from './layouts/component/quanlygoi/quanlygoi.component';
import { NangcapthietbiComponent } from './layouts/component/nangcapthietbi/nangcapthietbi.component';
import { NhatkyComponent } from './layouts/component/nhatky/nhatky.component';
import { HomeComponent } from './layouts/component/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    DashboardComponent,
    ThietbiComponent,
    NentangComponent,
    QuanlysubnetComponent,
    QuanlygoiComponent,
    NangcapthietbiComponent,
    NhatkyComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
