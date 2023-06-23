import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuanLySubnetService {
  constructor(private http: HttpClient) {}
  LayDsQuanLySubnet(): Observable<any> {
    return this.http.get(API_URL + 'quanlysubnet');
  }
  LayQuanLySubnet(id:any): Observable<any> {
    return this.http.get(`${API_URL}quanlysubnet/${id}`);
  }
}
