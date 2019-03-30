import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  _id: string;
  name: string;
  email: string;
  password: string;
  information: { age: 0 }
}

@Component({
  selector: 'update-member-details-dialog',
  templateUrl: './update-member-details-dialog.component.html',
  styleUrls: ['./update-member-details-dialog.component.css']
})
export class UpdateMemberDetailsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateMemberDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }
}
