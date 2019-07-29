import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { DashboardService } from 'src/app/services/dashboard.service'

export interface BookingListData{
  time: string,
  tables: string,
  status: string,
  customerEmail: string,
  _id: string
}

@Component({
  selector: 'bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  selectedDate: Date = new Date();

  displayedColumns: string[] = ['time', 'tables', 'status', 'email', '_id'];
  dataSource: MatTableDataSource<BookingListData>;
  bookingList = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _dashboardService: DashboardService) { }

  ngOnInit() {
    console.log(this.selectedDateToString())
    this.getBookings();
  }

  getBookings() {
    this._dashboardService.getBookingsByDate({date: this.selectedDateToString()})
    .subscribe(
      res => {
        var resBookingList = []
        resBookingList = res.bookings;
        resBookingList.forEach(item => {
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

  selectedDateToString() {
    var month = (this.selectedDate.getMonth()+1).toString();
    if(this.selectedDate.getMonth()+1 < 10)
    {
      month = `0${this.selectedDate.getMonth()+1}`
    }
    return `${this.selectedDate.getFullYear()}${month}${this.selectedDate.getDate()}`
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
        case 'time': return compare(a.time, b.time, isAsc);
        case 'tables': return compare(a.tables, b.tables, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        case 'email': return compare(a.customerEmail, b.customerEmail, isAsc);
        case '_id': return compare(a._id, b._id, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}