import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/data/_services/storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private storageService: StorageService,
    private router: Router, private toastr: ToastrService
  ) { }
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
  accept() {
    this.storageService.signOut();
    this.router.navigate(['/newPassword']);
  }
}
