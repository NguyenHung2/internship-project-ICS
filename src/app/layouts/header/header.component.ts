import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { LogoutComponent } from 'src/app/auth/logout/logout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  opened = true;

  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {

  }
  //thêm mở dialog để đăng xuất
  openDialog(): void {
    this.dialog.open(LogoutComponent, {
      width: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
  }

  //thêm mở dialog để đổi mật khẩu
  openChangePasswordDialog(): void {
    this.dialog.open(ChangePasswordComponent, {
      width: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
  }
}
