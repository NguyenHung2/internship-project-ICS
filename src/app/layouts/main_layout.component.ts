
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-layout',
  template: '<app-header></app-header>',
  styles: [`
  .mat-toolbar.mat-dark {
      background: #000;
      color: #fff;
  }
  app-menu {
      position: absolute;
      width: 100%;
      top: 4rem;
      z-index: 1;
  }
  `]
})
export class MainLayoutComponent {
  title = 'angularmaterial';
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  eventBusSub?: Subscription;

  constructor(
    private router: Router
  ) { }
  ngOnInit(): void {

  }

}
