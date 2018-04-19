import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../model/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditDialogComponent {

  user: User = new User({});

  constructor(public dialogRef: MatDialogRef<UserEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = new User({});
    this.user.username = data.username;
    this.user.email = data.email;
    this.user.id = data.id;
  }


  cancel() {
    this.dialogRef.close(undefined);

  }

  updateUser() {
    this.dialogRef.close(this.user);
  }

}
