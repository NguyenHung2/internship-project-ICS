import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layouts/component/dashboard/dashboard.component';
import { ThietbiComponent } from './layouts/component/danhmuc/thietbi/thietbi.component';
import { NentangComponent } from './layouts/component/danhmuc/nentang/nentang.component';
import { QuanlygoiComponent } from './layouts/component/quanlygoi/quanlygoi.component';
import { NangcapthietbiComponent } from './layouts/component/nangcapthietbi/nangcapthietbi.component';
import { NhatkyComponent } from './layouts/component/nhatky/nhatky.component';
import { HomeComponent } from './layouts/component/home/home.component';
import { QuanlysubnetComponent } from './layouts/component/danhmuc/quanlysubnet/quanlysubnet.component';

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
