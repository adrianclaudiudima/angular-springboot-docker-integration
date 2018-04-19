import {Injectable} from '@angular/core';
import {UrlResolverService} from './url-resolver.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class UsersService {

  private allUsers: Array<User> = [];
  private allUsersSubject: ReplaySubject<Array<User>> = new ReplaySubject<Array<User>>(1);
  allUsersObservable$ = this.allUsersSubject.asObservable();

  private urlResolver: UrlResolverService;

  /** Defining  private urlResolver: UrlResolverService in constructor arg does not require manual association*/
  constructor(urlResolver: UrlResolverService, private httpClient: HttpClient) {
    this.urlResolver = urlResolver;
  }

  public listAllUsers(): Observable<any> {
    return new Observable<any>(subscriber => {
      this.httpClient.get<Array<User>>(this.urlResolver.getUserListUrl())
        .subscribe(successResponse => {
        const userList: Array<User> = [];
        successResponse.forEach(userResponse => {
          const user: User = new User(userResponse);
          userList.push(user);
        });
        this.allUsers = userList;
        this.allUsersSubject.next(this.allUsers);
        // don't send the actual data. The data is synchronized via ReplaySubject
        subscriber.next(true);
      }, errorResponse => {
        subscriber.error('Service is down. Please try again later...');
      });
    });

  }

  public updateUser(user: User): Observable<any> {
    return new Observable<any>(subscriber => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

      this.httpClient.put<User>(this.urlResolver.getEditUserUrl(), JSON.stringify(user), {headers}).subscribe(successResponse => {
        this.allUsers[this.findIndexOfUser(successResponse)] = successResponse;
        this.allUsersSubject.next(this.allUsers);
      });
    });
  }

  public createUser(user: User): Observable<any> {
    return new Observable<any>(subscriber => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
      this.httpClient.post<User>(this.urlResolver.getCreateUserUrl(), JSON.stringify(user), {headers}).subscribe(successResponse => {
        this.allUsers.push(successResponse);
        this.allUsersSubject.next(this.allUsers);
      });
    });

  }

  public deleteUser(user: User): Observable<any> {
    return new Observable<any>(subscriber => {
      this.httpClient.delete(this.urlResolver.getDeleteUserUrl(user.id))
        .subscribe(successResponse => {
          this.allUsers = this.allUsers.filter(value => value.id !== user.id);
          this.allUsersSubject.next(this.allUsers);
        });
    });

  }

  private findIndexOfUser(user: User): number {
    return this.allUsers.indexOf(this.allUsers.find(element => element.id === user.id));
  }

}

