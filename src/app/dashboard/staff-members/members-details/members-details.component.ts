import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'members-details',
  templateUrl: './members-details.component.html',
  styleUrls: ['./members-details.component.css']
})
export class MembersDetailsComponent implements OnInit {
  getStaff = {_id: ""}
  staffDetails = {information: {}}

  constructor(
    private _dashboardService: DashboardService,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap
      .subscribe(params => {
        this.getStaff._id = params.get('id');
      }
    );
    this._dashboardService.getStaffById(this.getStaff)
      .subscribe(
        res => {
          this.staffDetails = res.objectReturned
        },
        err => console.log(err)
    );
  }

}
