import { NenTangService } from './../../../data/_services/nentang.service';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GoiService } from '../../../data/_services/goi.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive';
  isEdit: boolean = false;
  nenTangList: any[] = [];
  selectedNenTang: any;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PopupComponent>,
    private formBuilder: FormBuilder,
    private goiService: GoiService,
    private nenTangService: NenTangService
  ) {}

  // Thêm một getter để dễ dàng truy cập các trường của form và kiểm tra trạng thái
  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {
    this.inputdata = this.data?.title ? this.data : {};
    if (this.inputdata.id > 0) {
      this.isEdit = true;
      this.setPopupData(this.inputdata.id);
    }
    this.layDsNenTang();
  }
  layDsNenTang(){
    this.nenTangService.LayDsNenTang().subscribe((data: any) => {
      this.nenTangList = data; // Lưu danh sách Nền tảng vào biến nenTangList
    });
  }
  setPopupData(id: any) {
    this.goiService.LayGoi(id).subscribe(item => {
      this.editdata = item;
      this.myform.setValue({
        tenGoi: this.editdata.tenGoi,
        noiLuu: this.editdata.noiLuu,
        moTa: this.editdata.moTa,
        phienBan: this.editdata.phienBan,
        nenTangId: this.editdata.nenTang.id
      });
      const nenTangId = this.editdata.nenTang.id;
      this.selectedNenTang = nenTangId; // Gán giá trị cho selectedNenTang trực tiếp
    });
  }


  closePopup() {
    this.dialogRef.close('Closed using function');
  }

  myform = this.formBuilder.group({
    tenGoi: ['', Validators.required],
    noiLuu: ['', Validators.required],
    moTa: ['', Validators.required],
    phienBan: ['', Validators.required],
    nenTangId: ['', Validators.required]
  });

  saveGoiNangCap() {
    // Kiểm tra tính hợp lệ của form
    if (this.myform.valid) {

      if (this.isEdit) {
        this.goiService.SuaGoi(this.inputdata.id, this.myform.value).subscribe(() => {
          this.closePopup();
        });
      } else {
        this.goiService.ThemGoi(this.myform.value).subscribe(() => {
          this.closePopup();
        });
      }
    } else {
      // Đánh dấu tất cả các trường là đã chạm (touched) để hiển thị lỗi
      this.myform.markAllAsTouched();
    }
  }

  downloadFile() {
    // Logic để tải xuống tệp tin
  }

  uploadFile(fileInput: HTMLInputElement) {
    const file = fileInput.files![0];
    // Logic để tải lên tệp tin
  }
}
