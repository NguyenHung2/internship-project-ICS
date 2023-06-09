import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './config';
@Injectable({
  providedIn: 'root'
})
export class GoiService {
  constructor(private http: HttpClient) {}
  LayDsGoi(): Observable<any> {
    return this.http.get(API_URL + 'goi');
  }
  ThemGoi(data: any) {
    return this.http.post(`${API_URL}goi`, data);
  }
  LayGoi(id: any) {
    return this.http.get(`${API_URL}goi/${id}`);
  }
  SuaGoi(id: any, data: any) {
    return this.http.put(`${API_URL}goi/${id}`, data);
  }
  XoaGoi(id: any) {
    return this.http.delete(`${API_URL}goi/${id}`);
  }
}
