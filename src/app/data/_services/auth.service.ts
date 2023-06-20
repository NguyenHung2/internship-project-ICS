import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }
  //hàm đăng nhập được gọi ở auth/login
  login(taikhoan: string, matkhau: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        taikhoan,
        matkhau,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }


  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'changePassword',
      {
        oldPassword,
        newPassword
      },
      httpOptions
    );
  }
}
