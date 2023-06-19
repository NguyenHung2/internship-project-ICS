import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThietbiService {
  constructor(private http: HttpClient) {}
  LayDsThietBi(): Observable<any> {
    return this.http.get(API_URL + 'thietbi');
  }
  LayThietBi(id:any): Observable<any> {
    return this.http.get(`${API_URL}thietbi/${id}`);
  }
}
