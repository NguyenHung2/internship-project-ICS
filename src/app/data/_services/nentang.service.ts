import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class NenTangService {
  constructor(private http: HttpClient) {}

  LayDsNenTang(): Observable<any> {
    return this.http.get(API_URL + 'nentang');
  }

  ThemNenTang(data: any) {
    return this.http.post(`${API_URL}nentang`, data);
  }

  LayNenTang(id: any) {
    return this.http.get(`${API_URL}nentang/${id}`);
  }

  SuaNenTang(id: any, data: any) {
    return this.http.put(`${API_URL}nentang/${id}`, data);
  }

  XoaNenTang(id: any) {
    return this.http.delete(`${API_URL}nentang/${id}`);
  }
}
