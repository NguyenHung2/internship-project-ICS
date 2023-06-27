import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/data/_services/auth.service';
import { StorageService } from 'src/app/data/_services/storage.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  //kiểm tra đã đăng nhập hay chưa
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }
  }
  //tạo các thuộc tính form để validate
  form: any = {
    password: null,
    newPassword: null,
  };
  submit() {
    const { password, newPassword } = this.form;
    this.authService.changePassword(password, newPassword).subscribe({
      next: data => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/home'])
        this.toastr.success("Thay đổi mật khẩu thành công")
      },
      error: err => {
        if (err.status === 0) {
          this.errorMessage = "Lỗi server!";
          this.isLoginFailed = true;
        } else if (err.error.message === "INVALID_USERNAME") {
          this.errorMessage = "Sai tên tài khoản!";
          this.isLoginFailed = true;
        } else if (err.error.message === "INVALID_PASSWORD") {
          this.errorMessage = "Sai mật khẩu!";
          this.isLoginFailed = true;
        } else {
          this.errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại sau.";
          this.isLoginFailed = true;
          this.errorMessage = err.error.message;
        }
      }
    });
  }
}
