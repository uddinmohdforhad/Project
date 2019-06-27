import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { TableService } from 'src/app/services/table.service';
import { Router } from '@angular/router';
import { _MatAutocompleteMixinBase, MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';

export interface Time {
  value: string;
  viewValue: string;
}

export interface Table {
  tableNo: string;
  capacity: number;
  isSelected: boolean;
}

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {
  selectedDate: Date = new Date();
  selectedTime: string = 'five_six';
  times: Time[] = [
    {value: 'five_six', viewValue: '17:00'},
    {value: 'six_seven', viewValue: '18:00'},
    {value: 'seven_eight', viewValue: '19:00'},
    {value: 'eight_nine', viewValue: '20:00'},
    {value: 'nine_ten', viewValue: '21:00'},
    {value: 'ten_eleven', viewValue: '22:00'},
    {value: 'eleven_twelve', viewValue: '23:00'}
  ];

  availableTables: Table[] = [];

  displayedColumns: string[] = ['tableNo', 'capacity', 'isSelected'];
  dataSource: MatTableDataSource<Table>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _auth: AuthService,
              private _bookingService: BookingService,
              private _tableService: TableService,
              private _router: Router) { }

  ngOnInit() {
  }

  searchAvailableTables() {
    var dateTimeReq = {
      date: this.selectedDateToString(),
      time: this.selectedTime
    }

    this._tableService.getAvailableTables(dateTimeReq)
    .subscribe(
      res => {
        this.availableTables = res.availableTables;
        this.availableTables.forEach(item => item.isSelected = false)

        this.dataSource = new MatTableDataSource(this.availableTables)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        alert(`Error: ${err.error.message}`);
      }
    )
  }

  bookTables() {
    var bookingReq = {
      token: this._auth.getToken(),
      date: this.selectedDateToString(),
      time: this.selectedTime,
      tables: this.getSelectedTableNumbers()
    }

    this._bookingService.book(bookingReq)
    .subscribe(
      res => {
        console.log(res)
        var updateReq = {
          tables: res.booking.tables,
          date: res.booking.date,
          time: res.booking.time,
          updateAvailability: false
        }
        this._tableService.updateTablesAvailability(updateReq)
          .subscribe(
            updateRes => {
              alert(res.message)
              this._router.navigate([''])
            },
            uppdateErr => {
              alert(`Error: ${uppdateErr.error.message}`)
            }
          )
      },
      err => {
        alert(`Error: ${err.error.message}`)
      }
    )
  }

  getSelectedTableNumbers() {
    var selectedTableNumbers = []
    
    this.availableTables.forEach(table => {
      if(table.isSelected)
      {
        selectedTableNumbers.push(table.tableNo)
      }
    })

    return selectedTableNumbers;
  }
  
  selectedDateToString() {
    var month = (this.selectedDate.getMonth()+1).toString();
    if(this.selectedDate.getMonth()+1 < 10)
    {
      month = `0${this.selectedDate.getMonth()+1}`
    }
    return `${this.selectedDate.getFullYear()}${month}${this.selectedDate.getDate()}`
  }

  selectTable(row: Table) {
    row.isSelected = !row.isSelected;
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
        case 'tableNo': return compare(a.tableNo, b.tableNo, isAsc);
        case 'capacity': return compare(a.capacity, b.capacity, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}