import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../data/_services/storage.service';


@Component({
  selector: 'app-main-layout',
  template: '<app-header></app-header><app-menu></app-menu>',
})
export class MainLayoutComponent {
  isLoggedIn = false;
  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // this.isLoggedIn = this.storageService.isLoggedIn();
    // //chưa đăng nhập sẽ đưa về login
    // if (this.isLoggedIn) {
    //   const user = this.storageService.getUser();
    // }else{
    //   this.router.navigate(['/login']);
    // }
  }

  logout(): void {
    this.storageService.signOut();
    window.location.reload();
  }

}
