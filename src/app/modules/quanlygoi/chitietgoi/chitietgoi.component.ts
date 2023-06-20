import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InfoComponent } from '../../nhatky/info/info.component';
import { GoiService } from 'src/app/data/_services/goi.service';

@Component({
  selector: 'app-chitietgoi',
  templateUrl: './chitietgoi.component.html',
  styleUrls: ['./chitietgoi.component.css']
})
export class ChitietgoiComponent {
  goi: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InfoComponent>,
    private goiService: GoiService
  ) {}
  ngOnInit(): void {
    this.layNhatKy(this.data.id);
  }

  layNhatKy(id: any) {
    this.goiService.LayGoi(id).subscribe((goiData) => {
      this.goi = goiData;
    });
  }
  closePopup() {
    this.dialogRef.close();
  }
}
