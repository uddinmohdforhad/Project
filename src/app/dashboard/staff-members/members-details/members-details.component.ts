import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

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
    private _router: Router) { }

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
