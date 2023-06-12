import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './config';

@Injectable({
  providedIn: 'root',
})
export class NhatKyService {
  constructor(private http: HttpClient) {}
  LayDsNhatKy(): Observable<any> {
    return this.http.get(API_URL + 'nhatky');
  }
  ThemNhatKy(id: any, data: any) {
    return this.http.put(`${API_URL}nhatky/${id}`, data);
  }
  LayNhatKy(id:any): Observable<any> {
    return this.http.get(`${API_URL}nhatky/${id}`);
  }
}
