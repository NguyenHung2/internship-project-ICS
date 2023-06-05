import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ThietbiComponent } from './modules/danhmuc/thietbi/thietbi.component';
import { NentangComponent } from './modules/danhmuc/nentang/nentang.component';
import { QuanlygoiComponent } from './modules/quanlygoi/quanlygoi.component';
import { NangcapthietbiComponent } from './modules/nangcapthietbi/nangcapthietbi.component';
import { NhatkyComponent } from './modules/nhatky/nhatky.component';
import { HomeComponent } from './modules/home/home.component';
import { QuanlysubnetComponent } from './modules/danhmuc/quanlysubnet/quanlysubnet.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent,},
  {path: 'dashboard', component: DashboardComponent,},
  {path: 'thietbi', component: ThietbiComponent},
  {path: 'nentang', component: NentangComponent},
  {path: 'quanlysubnet', component: QuanlysubnetComponent},
  {path: 'quanlygoi', component: QuanlygoiComponent},
  {path: 'nangcapthietbi', component: NangcapthietbiComponent},
  {path: 'nhatky', component: NhatkyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
