import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { MatDialog } from '@angular/material';
import { UpdateMemberDetailsDialogComponent } from '../update-member-details-dialog/update-member-details-dialog.component';

@Component({
  selector: 'members-details',
  templateUrl: './members-details.component.html',
  styleUrls: ['./members-details.component.css']
})
export class MembersDetailsComponent implements OnInit {
  getStaff = {_id: ""}
  staffDetails = {name:"", information: {}}

  constructor(
    private _dashboardService: DashboardService,
    private _acctivatedRoute: ActivatedRoute,
    private _router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this._acctivatedRoute.paramMap
      .subscribe(params => {
        this.getStaff._id = params.get('id');
      }
    );
    this._dashboardService.getStaffById(this.getStaff)
      .subscribe(
        res => {
          this.staffDetails = res.objectReturned
        },
        err => {
          alert(err.error.message)
          this._router.navigate(["/dashboard/staff-members"])
        }
    );
  }

  update() {
    const dialogRef = this.dialog.open(UpdateMemberDetailsDialogComponent, {
      data: this.staffDetails
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.staffDetails = result;
        this.updateDatabase();
      } 
    });
  }

  updateDatabase() {
    this._dashboardService.updateStaff(this.staffDetails).subscribe(
      res => alert(res.message),
      err => {
        console.log(err);
        alert("An error occurred, please try again");
      }
    )
  }

  remove() {
    var confirm = window.confirm(`Do you want to remove ${this.staffDetails.name}?`)
    if(confirm == true) {
      this._dashboardService.removeStaff(this.staffDetails).subscribe(
        res => {
          alert(res.message)
          this._router.navigate(["/dashboard/staff-members"])
        },
        err => console.log(err)
      )
    }
  }
}
