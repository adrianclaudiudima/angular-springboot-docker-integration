import {Routes} from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserManagementComponent} from './components/user-management/user-management.component';

export const appRoutes: Routes = [
  {
    path: 'user-list', component: UserListComponent
  }, {
    path: '', component: UserManagementComponent
  }
];
