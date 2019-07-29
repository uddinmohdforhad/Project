import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { DashboardService } from 'src/app/services/dashboard.service'

export interface OrderListData{
  date: string,
  totalPayment: string,
  customerId: string,
  _id: string
}

@Component({
  selector: 'all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  displayedColumns: string[] = ['date', 'totalPayment', '_id', 'customerId'];
  dataSource: MatTableDataSource<OrderListData>;
  orderList = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _dashboardService: DashboardService) { }

  ngOnInit() {
    this._dashboardService.getAllOrders().subscribe(
      res => {
        res.orders.forEach(order => {
          var viewOrder = {
            _id: order._id,
            date: this.getBiutifyDateString(order.date),
            totalPayment: order.totalPayment,
            customerId: order.customerId
          }
          this.orderList.push(viewOrder)
        });
        this.dataSource = new MatTableDataSource(this.orderList)
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
        case 'totalPayment': return compare(a.totalPayment, b.totalPayment, isAsc);
        case 'email': return compare(a.customerId, b.customerId, isAsc);
        case '_id': return compare(a._id, b._id, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}