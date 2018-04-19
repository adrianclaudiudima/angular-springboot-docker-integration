import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {User} from '../../model/user';
import {MatDialog, MatTable} from '@angular/material';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {UsersService} from '../../services/users.service';
import {UserEditDialogComponent} from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  id = 1;
  dataSource: Array<User> = [];

  @ViewChild(MatTable)
  matDataTable: MatTable<Array<User>>;

  @Output()
  dataLoadedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  displayedColumns = ['id', 'username', 'email', 'actions'];

  constructor(private matDialog: MatDialog, private userService: UsersService) {
    this.userService.allUsersObservable$.subscribe(value => {
      this.dataSource = value;
      if (this.matDataTable !== undefined) {
        this.matDataTable.renderRows();
      }
      this.dataLoadedEvent.emit(true);

    });
  }

  /**
   * Opens an edit dialog for user
   * @param {User} user
   */
  editUser(user: User) {
    const dialogRef = this.matDialog.open(UserEditDialogComponent,
      {
        width: '500px',
        data: user
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.userService.updateUser(result).subscribe(value => {
        }, error1 => {
          // do error handling for update case;
        });
      }
    });

  }

  /**
   * Opens a delete dialog for user
   * @param {User} user
   */
  deleteUser(user: User) {
    const deleteDialogReference = this.matDialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        confirmationMessage: 'Are you sure you want to delete user ?',
        ok: 'Yes',
        cancel: 'No'
      }
    });
    deleteDialogReference.afterClosed()
      .subscribe(dialogResponseValue => {
        if (dialogResponseValue) {
          this.userService.deleteUser(user).subscribe(value => {

          }, error1 => {

          });
        }
      });
  }

  getPositionInArray(user: User) {
    return this.dataSource.indexOf(user) + 1;
  }

}

