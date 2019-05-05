import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';

export interface BookingListData{
  date: string,
  capacity: string,
  _id: string
}

@Component({
  selector: 'my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'capacity', '_id'];
  dataSource: MatTableDataSource<BookingListData>;
  bookingList = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this._auth.getMyBookings()
    .subscribe(
      res => {
        this.bookingList = res
        this.dataSource = new MatTableDataSource(this.bookingList)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => console.log(err)
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'capacity': return compare(a.capacity, b.capacity, isAsc);
        case '_id': return compare(a._id, b._id, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}