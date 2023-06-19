
import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/data/_services/auth.service';
import { StorageService } from 'src/app/data/_services/storage.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

//cần import MatInputModule, MatFormFieldModule vào material
@Component({
  selector: 'my-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
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
    username: null,
    password: null
  };
  submit() {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
       this.router.navigate(['/home'])
       this.toastr.success("Đăng nhập thành công")
      },
      error: err => {
        if (err.status === 0) {
          this.errorMessage = "Lỗi server!";
          this.isLoginFailed = true;
        } else if(err.error.message === "INVALID_USERNAME")
        {
          this.errorMessage = "Sai tên tài khoản!";
          this.isLoginFailed = true;
        }else if(err.error.message === "INVALID_PASSWORD")
        {
          this.errorMessage = "Sai mật khẩu!";
          this.isLoginFailed = true;
        }else{
          this.errorMessage = "Lỗi rồi!";
          this.isLoginFailed = true;
          this.errorMessage = err.error.message;
        }
      }
    });
  }
}
