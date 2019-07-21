import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import { TableService } from 'src/app/services/table.service';

export class TableListData {
  tableNo: string;
  capacity: number;
}

@Component({
  selector: 'tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  displayedColumns: string[] = ['tableNo', 'capacity', 'acction'];
  dataSource: MatTableDataSource<TableListData>;
  tableList = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tableNoFormControl = new FormControl('', [Validators.required]);
  capacityFormControl = new FormControl('', [Validators.required]);
  newTable = new TableListData;

  editTableData = new TableListData;

  listDisplayed = true;
  formDisplayed = false;
  editFormDisplayed = false;

  constructor(private _tableService: TableService) { }

  ngOnInit() {
    this._tableService.getAllTables()
      .subscribe(
        res => {
          this.tableList = res.tableList
          this.dataSource = new MatTableDataSource(this.tableList)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.displayList();
        },
        err => console.log(err)
      )
  }

  addTable() {
    this._tableService.add(this.newTable)
      .subscribe(
        res => {
          alert(res.message)
          this.ngOnInit();
        },
        err => {
          alert("error: please try again")
        }
      )
  }

  deleteTable(tableNo: string) {
    this._tableService.delete({tableNo}).subscribe(
      res => {
        alert(res.message);
        this.ngOnInit();
      },
      err => {
        alert(err.error.message)
      }
    )
  }

  updateTable() {
    console.log(this.editTableData)
    let tableNo = this.editTableData.tableNo
    this._tableService.getTableByNumber({tableNo}).toPromise().then(
      onfulfilled => {
        var tableData = onfulfilled.table
        tableData.capacity = this.editTableData.capacity
        console.log(tableData)

        this._tableService.update(tableData).subscribe(
          res => {
            alert(res.message)
            this.ngOnInit();
          },
          err => {
            alert(err.error.message);
            this.ngOnInit()
          }
        )
      },
      () => {
        alert("error!")
        this.ngOnInit()
      }
    );
  }

  displayList() {
    this.newTable = new TableListData;
    this.editTableData = new TableListData;
    this.listDisplayed = true;
    this.formDisplayed = false;
    this.editFormDisplayed = false;
  }
  displayAddForm() {
    this.listDisplayed = false;
    this.formDisplayed = true;
    this.editFormDisplayed = false;
  }
  displayEditForm(tableNo: string, capacity: number) {
    this.editTableData = { tableNo, capacity };

    this.listDisplayed = false;
    this.formDisplayed = false;
    this.editFormDisplayed = true;
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