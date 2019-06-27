import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import { BookingService } from 'src/app/services/booking.service';

export interface BookingListData{
  date: string,
  time: string,
  tables: string,
  _id: string
}

@Component({
  selector: 'my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'time', 'tables', '_id'];
  dataSource: MatTableDataSource<BookingListData>;
  bookingList = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _auth: AuthService,
              private _bookingServece: BookingService) { }

  ngOnInit() {
    this._bookingServece.getMyBookings()
    .subscribe(
      res => {
        var resBookingList = []
        resBookingList = res;
        resBookingList.forEach(item => {
          item.date = this.getBiutifyDateString(item.date);
          item.time = this.getTimeValueFromKey(item.time);
        })
        this.bookingList = resBookingList
        this.dataSource = new MatTableDataSource(this.bookingList)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => console.log(err)
    )
  }

  getBiutifyDateString(date: string){
    var str = date;
    return `${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)}`
  }

  getTimeValueFromKey(key: string) {
    switch(key){
      case "five_six":
        return "17:00";
      case "six_seven":
        return "18:00";
      case "seven_eight":
        return "19:00";
      case "eight_nine":
        return "20:00";
      case "nine_ten":
        return "21:00";
      case "ten_eleven":
        return "22:00";
      case "eleven_twelve":
        return "23:00";
      default:
        return ""
    }
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
        case 'time': return compare(a.time, b.time, isAsc);
        case 'tables': return compare(a.tables, b.tables, isAsc);
        case '_id': return compare(a._id, b._id, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}