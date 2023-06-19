import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  constructor(private http: HttpClient) { }
  LayDsKhachHang(): Observable<any> {
    return this.http.get(API_URL + 'khachhang');
  }
  LayKhachHang(id: any): Observable<any> {
    return this.http.get(`${API_URL}khachhang/${id}`);
  }
}
