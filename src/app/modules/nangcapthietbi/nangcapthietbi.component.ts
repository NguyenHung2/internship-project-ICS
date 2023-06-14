import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoiService } from '../../data/_services/goi.service'
import { ThietbiService } from '../../data/_services/thietbi.service';
import { GoiNangCap } from '../quanlygoi/quanlygoi.component';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-nangcapthietbi',
  templateUrl: './nangcapthietbi.component.html',
  styleUrls: ['./nangcapthietbi.component.css']
})
export class NangcapthietbiComponent implements OnInit {
  myForm!: FormGroup;
  goiList!: GoiNangCap[];
  deviceList!: any[];
  deviceName: string = '';
  goiName: string = '';
  device: any; // Thêm biến device để lưu thông tin thiết bị
  goi: GoiNangCap | undefined; // Thêm biến goi để lưu thông tin gói nâng cấp

  constructor(
    private formBuilder: FormBuilder,
    private goiService: GoiService,
    private thietBiService: ThietbiService
  ) { }


  ngOnInit(): void {
    this.initializeForm();
    this.loadGoiList();
    this.loadDeviceList();

    this.myForm.get('selectedDevice')?.valueChanges.pipe(debounceTime(0)).subscribe(() => {
      this.showInfo();
    });
    this.myForm.get('selectedGoi')?.valueChanges.pipe(debounceTime(0)).subscribe(() => {
      this.showInfo();
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

  showInfo(): void {
    const selectedDevice = this.myForm.value.selectedDevice;
    const selectedGoi = this.myForm.value.selectedGoi;
    // Lấy thông tin thiết bị từ danh sách thiết bị dựa trên ID
    this.device = this.deviceList.find(item => item.id === selectedDevice);
    console.log(this.device)
    // Lấy thông tin gói nâng cấp từ danh sách gói nâng cấp dựa trên ID
    this.goi = this.goiList.find(item => item.id === selectedGoi);

  }
}
