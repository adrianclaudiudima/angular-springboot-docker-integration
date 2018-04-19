import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../model/user';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationDialogComponent {

  user: User = new User({
    username: '',
    email: ''
  });

  constructor(public dialogRef: MatDialogRef<UserCreationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  cancel() {
    this.dialogRef.close(undefined);
  }

  createUser() {
    this.dialogRef.close(this.user);

  }


}
