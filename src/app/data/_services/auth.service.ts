import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';
const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  login(taikhoan: string, matkhau: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', 'angular-pkce-client')
      .set('client_secret', 'XQMZDm3fLXWQQNzTL0QAZNzzMNdywu0T')
      .set('username', taikhoan)
      .set('password', matkhau)
      //post by proxy "target": "http://10.82.24.11:30141/realms/ics/protocol/openid-connect"
    return this.http.post(
      '/token',
      body.toString(),
      { headers: headers }
    ).pipe(
      tap(response => {
        // Lưu thông tin người dùng vào cookie sau khi đăng nhập thành công
        this.storageService.saveUser(response)
      })
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
