import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import { ThietbiService } from 'src/app/data/_services/thietbi.service';
import { thietBiData } from '../danhmuc/thietbi/thietbi.component';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  map!: mapboxgl.Map;
  locationName = '';
  locationCoordinates: number[] = [];
  data: thietBiData[] = [];
  popup: mapboxgl.Popup | null = null;
  currentMarker: mapboxgl.Marker | null = null;
  addingLocation: boolean = false;
  buttonName: string = 'Add Location';
  address!: string;
  iconUrl = '../../../assets/celltower.png'; // Thay đổi đường dẫn icon từ server ở đây

  constructor(
    private http: HttpClient,
    private thietBiService: ThietbiService
  ) {}

  ngOnInit() {
    mapboxgl!.accessToken =
      'pk.eyJ1IjoiYjE5MTA0ODAiLCJhIjoiY2xpaW12ZjJ5MXZ2ajNqczF4Y2NzYmNrdiJ9.DaXt-2gXJinZeoBDM63rAA';
    this.getLocations();
  }

  ngAfterViewInit() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 12,
    });

    // Lấy vị trí hiện tại
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      // Thay thế vị trí hiện tại vào center của bản đồ
      this.map.setCenter([longitude, latitude]);
    });

    // Tắt popup nếu không phải marker
    this.map.on('click', (event) => {
      const targetElement = event.originalEvent.target as HTMLElement;
      const isMarker = targetElement.closest('.mapboxgl-marker');

      if (!isMarker) {
        this.removePopup();
      }
    });

    // Đổi ngôn ngữ bản đồ
    this.map.addControl(new MapboxLanguage({
      defaultLanguage: 'vi'
    }));
  }

  // Lấy địa điểm từ server
  getLocations() {
    this.thietBiService.LayDsThietBi().subscribe((data) => {
      this.data = data;
      console.log(this.data);
      this.displayLocationsOnMap();
    });
  }

  // Hiển thị lên bản đồ
  displayLocationsOnMap() {
    this.data.forEach((data) => {
      if (data.kinhDo && data.viDo) {
        const coordinates = new mapboxgl.LngLat(
          parseFloat(data.kinhDo),
          parseFloat(data.viDo)
        );
        //custom marker
        const el = document.createElement('div');
        const width = 50; // Thay đổi kích thước icon nếu cần thiết
        const height = 50; // Thay đổi kích thước icon nếu cần thiết
        el.className = 'marker';
        el.style.backgroundImage = `url(${this.iconUrl})`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';

        const marker = new mapboxgl.Marker({
          element: el,
          anchor: 'bottom' // Điều chỉnh vị trí neo của marker nếu cần thiết
        })
          .setLngLat(coordinates)
          .addTo(this.map);

        marker.getElement()?.addEventListener('click', () => {
          this.removePopup();
          //lấy địa chỉ trước khi hiển thị popup
          this.reverseGeocode(
            parseFloat(data.kinhDo),
            parseFloat(data.viDo),
            () => {
              this.createPopupInfo(coordinates, data.ten, data.serial);
            }
          );
        });
      }
    });
  }

  // Tắt popup
  removePopup() {
    if (this.popup) {
      this.popup.remove();
      this.popup = null;
    }
  }

  // Popup thông tin địa điểm
  createPopupInfo(coordinates: mapboxgl.LngLat, ten: string, serial: string) {
    this.removePopup();

    this.popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    })
      .setLngLat(coordinates)
      .setHTML(
        `<p>${ten}</p>
      <p>${serial}</p>
      <p>${this.address}</p>`
      )
      .addTo(this.map);
  }

  // Hàm lấy địa chỉ của vị trí
  reverseGeocode(
    longitude: number,
    latitude: number,
    callback: () => void
  ): void {
    // Gọi API reverse geocoding để lấy địa điểm từ tọa độ
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Lấy địa chỉ từ kết quả reverse geocoding
        const place = data.features[0];
        if (place && place.place_name) {
          this.address = place.place_name;
        }
        callback();
      });
  }
}
