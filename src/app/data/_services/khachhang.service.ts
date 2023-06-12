import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class KhachhangService {

  constructor(private http: HttpClient) { }
  // LayDsKH(): Observable<any> {
  //   return this.http.get(API_URL + 'dashboard');
  // }
  LayDsKH() {
    // Dữ liệu thiết bị từ JSON hoặc từ một nguồn dữ liệu khác
    return [
      { id: 1, hoTen: 'Nguyễn Văn A', diaChi: 'An Giang'},
      { id: 2, hoTen: 'Nguyễn Văn B', diaChi: 'An Giang'},
      { id: 3, hoTen: 'Nguyễn Thị C', diaChi: 'An Giang'}
    ];
  }
  ThemGoi(data: any) {
    return this.http.post(`${API_URL}dashboard`, data);
  }
  LayKH(id: any) {
    return this.http.get(`${API_URL}dashboard/${id}`);
  }
  SuaKH(id: any, data: any) {
    return this.http.put(`${API_URL}dashboard/${id}`, data);
  }
  XoaKH(id: any) {
    return this.http.delete(`${API_URL}hoi/${id}`);
  }
}
