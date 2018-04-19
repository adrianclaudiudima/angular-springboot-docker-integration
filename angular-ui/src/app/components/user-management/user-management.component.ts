import {Component, ViewChild} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {MatDialog} from '@angular/material';
import {UserCreationDialogComponent} from '../user-creation/user-creation.component';
import {UserListComponent} from '../user-list/user-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {

  @ViewChild('appUserList')
  appUserList: UserListComponent;
  isDataEmpty = true;
  isInitialDataLoaded = false;
  displayErrorMessage = false;
  errorMessage: string;

  constructor(private userService: UsersService, private  matDialog: MatDialog) {
    this.userService.allUsersObservable$.subscribe(value => {
      this.isDataEmpty = value.length === 0;
      this.isInitialDataLoaded = true;
    });
  }

  loadAllUsers() {
    this.userService.listAllUsers().subscribe(success => {
      this.displayErrorMessage = false;
    }, error => {
      this.displayErrorMessage = true;
      this.errorMessage = error;
    });
  }

  /**
   * Creates a new user.
   *
   * In a real world application, data from the mat table component would be an Observable<Array<User>>. This will not force us to trigger
   * the renderRows() method from it but for demo purposes I didn't use the observable (maybe i will updated if I have time);
   */
  createNewUser() {
    const dialogReference = this.matDialog.open(UserCreationDialogComponent, {width: '500px', data: {}});
    dialogReference.afterClosed().subscribe(value => {
      if (value !== undefined) {
        this.userService.createUser(value).subscribe(value1 => {
        }, error1 => {
        });
      }
    });
  }


  notifyUser(value: boolean) {
    console.log('data loaded ' + value);
  }


}
