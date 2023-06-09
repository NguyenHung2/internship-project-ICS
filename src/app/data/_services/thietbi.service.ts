import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThietbiService {
  layDsThietBi() {
    // Dữ liệu thiết bị từ JSON hoặc từ một nguồn dữ liệu khác
    return [
      { id: 1, name: 'Thiết bị 1' },
      { id: 2, name: 'Thiết bị 2' },
      { id: 3, name: 'Thiết bị 3' }
    ];
  }
}
