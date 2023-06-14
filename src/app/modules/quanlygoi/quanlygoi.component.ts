import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GoiService } from '../../data/_services/goi.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
export interface GoiNangCap {
  id: number;
  tenGoi: string;
  noiLuu: string;
  moTa: string;
  phienBan: string;
  nenTang: any;
  nenTangId: number;
}

@Component({
  selector: 'app-quanlygoi',
  templateUrl: './quanlygoi.component.html',
  styleUrls: ['./quanlygoi.component.css']
})
export class QuanlygoiComponent implements OnInit {
//khanh29
  dataSource!: MatTableDataSource<GoiNangCap>;
  displayedColumns: string[] = ['id', 'tenGoi', 'noiLuu', 'moTa', 'phienBan', 'nenTang', 'action'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private goiService: GoiService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchGoiNangCap();
  }

  fetchGoiNangCap(): void {
    this.goiService.LayDsGoi().subscribe((data: GoiNangCap[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addGoi(){
    this.Openpopup(0, 'Add Customer');
  }

  editGoi(id: any) {
    this.Openpopup(id, 'Edit Customer');
  }
  Openpopup(id: any, title: any) {
    var _popup = this.dialog.open(PopupComponent, {
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        title: title,
        id: id
      }
    });
    _popup.afterClosed().subscribe(item => {
      // console.log(item)
      this.fetchGoiNangCap();
    })
  }
}
