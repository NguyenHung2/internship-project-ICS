import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoiService } from '../../data/_services/goi.service'
import { ThietbiService } from '../../data/_services/thietbi.service';
import { GoiNangCap } from '../quanlygoi/quanlygoi.component';

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

  constructor(
    private formBuilder: FormBuilder,
    private goiService: GoiService,
    private thietBiService: ThietbiService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadGoiList();
    this.loadDeviceList();
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

  loadDeviceList(): void {
    this.deviceList = this.thietBiService.layDsThietBi();
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      const selectedDevice = this.myForm.value.selectedDevice;
      const selectedGoi = this.myForm.value.selectedGoi;

      // Lấy tên thiết bị từ danh sách thiết bị dựa trên ID
      const device = this.deviceList.find(item => item.id === selectedDevice);
      this.deviceName = device ? device.name : '';

      // Lấy tên gói nâng cấp từ danh sách gói nâng cấp dựa trên ID
      const goi = this.goiList.find(item => item.id === selectedGoi);
      this.goiName = goi ? goi.tenGoi : '';
    } else {
      this.myForm.markAllAsTouched();
    }
  }
}
