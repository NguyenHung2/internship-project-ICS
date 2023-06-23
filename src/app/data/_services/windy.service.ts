import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindyService {
  private apiUrl = 'https://api.windy.com/api/';

  constructor(private http: HttpClient) { }

  getMapForecast(lat: number, lon: number): Observable<any> {
    const apiKey = 'vbSPvDvTtCZpoZObgboFq64ZS1xyg3aC';
    const url = `${this.apiUrl}map-forecast/v2.3/point?lat=${lat}&lon=${lon}&key=${apiKey}`;

    return this.http.get(url);
  }
}
