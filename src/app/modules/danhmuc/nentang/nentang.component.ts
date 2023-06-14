import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NenTangService } from 'src/app/data/_services/nentang.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

export interface nenTangData {
  id: number;
  tenNenTang: string;
  donViSanXuat: string;
  phienBan: string;
}

@Component({
  selector: 'app-nentang',
  templateUrl: './nentang.component.html',
  styleUrls: ['./nentang.component.css']
})
export class NentangComponent {
  displayedColumns: string[] = ['id', 'userId', 'title', 'body'];
  dataSource!: MatTableDataSource<UserData>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: TableService) {
    this.service.getData().subscribe((data) => {
      console.log(data);
      this.posts = data;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.posts);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

