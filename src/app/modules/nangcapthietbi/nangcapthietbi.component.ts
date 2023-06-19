import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoiService } from '../../data/_services/goi.service'
import { ThietbiService } from '../../data/_services/thietbi.service';
import { GoiNangCap } from '../quanlygoi/quanlygoi.component';
import { debounceTime } from 'rxjs';
import { thietBiData } from '../danhmuc/thietbi/thietbi.component';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-nangcapthietbi',
  templateUrl: './nangcapthietbi.component.html',
  styleUrls: ['./nangcapthietbi.component.css']
})
export class NangcapthietbiComponent implements OnInit {
  myForm!: FormGroup;
  goiList!: GoiNangCap[];
  deviceList!: thietBiData[];
  deviceName: string = '';
  goiName: string = '';
  diachi: string ='';
  device: any; // Thêm biến device để lưu thông tin thiết bị
  goi: GoiNangCap | undefined; // Thêm biến goi để lưu thông tin gói nâng cấp

  constructor(
    private formBuilder: FormBuilder,
    private goiService: GoiService,
    private thietBiService: ThietbiService
  ) { }


  ngOnInit(): void {
    mapboxgl!.accessToken =
    'pk.eyJ1IjoiYjE5MTA0ODAiLCJhIjoiY2xpaW12ZjJ5MXZ2ajNqczF4Y2NzYmNrdiJ9.DaXt-2gXJinZeoBDM63rAA';
    this.initializeForm();
    this.loadGoiList();
    this.loadDeviceList();

    this.myForm.get('selectedDevice')?.valueChanges.pipe(debounceTime(0)).subscribe(() => {
      this.infoThietbi();
    });
    this.myForm.get('selectedGoi')?.valueChanges.pipe(debounceTime(0)).subscribe(() => {
      this.infoGoi();
    });
  }

  initializeForm(): void {
    this.myForm = this.formBuilder.group({
      selectedDevice: ['', Validators.required],
      selectedGoi: ['', Validators.required]
    });
  }

  loadGoiList(): void {
    this.goiService.LayDsGoi().subscribe((data: any) => {
      this.goiList = data;
    });
  }

  loadDeviceList() {
    this.thietBiService.LayDsThietBi().subscribe((data) => {
      this.deviceList = data;

      console.log(this.deviceList)
    });
  }

  infoThietbi(){
    const selectedDevice = this.myForm.value.selectedDevice;
    // Lấy thông tin thiết bị từ danh sách thiết bị dựa trên ID
    this.device = this.deviceList.find(item => item.id === selectedDevice);
    this.layDiaChi(parseFloat(this.device.kinhDo), parseFloat(this.device.viDo));
  }

  infoGoi(){
    const selectedGoi = this.myForm.value.selectedGoi;
    this.goi = this.goiList.find(item => item.id === selectedGoi);
  }

  // Hàm lấy địa chỉ của vị trí
  async layDiaChi(longitude: number, latitude: number): Promise<void> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const place = data.features[0];
      if (place && place.place_name) {
        this.diachi = place.place_name;
      }
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
    }
  }
}
