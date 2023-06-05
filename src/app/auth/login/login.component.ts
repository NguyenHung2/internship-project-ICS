import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/data/_services/auth.service';
import { StorageService } from 'src/app/data/_services/storage.service';
import { FormsModule } from '@angular/forms';

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
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(err.error.message);

        if (err.status === 0) {
          // Lỗi kết nối server
          alert("Lỗi server")
        } else if(err.error.message === "INVALID_USERNAME")
        {
          alert("Sai username")
        }else if(err.error.message === "INVALID_PASSWORD")
        {
          alert("Sai mật khẩu")
        }else{
          // Lỗi phản hồi từ server khác
          this.errorMessage = err.error.message;
        }
        this.isLoginFailed = true;
      }
    });

  }
  reloadPage(): void {
    window.location.reload();
  }
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
}
