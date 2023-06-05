import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/data/_services/storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.storageService.signOut();
    this.router.navigate(['/login']);
  }
}
