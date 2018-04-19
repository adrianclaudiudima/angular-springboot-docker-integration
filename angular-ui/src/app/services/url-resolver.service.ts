import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class UrlResolverService {

  private baseUrl = environment.apiBaseUrl;


  public getUserDetailUrl(): string {
    return this.baseUrl + environment.userBasePath;
  }

  public getUserListUrl(): string {
    return this.baseUrl + environment.listAllUsersPath;
  }

  public getEditUserUrl(): string {
    return this.baseUrl + environment.userBasePath;
  }

  public getCreateUserUrl(): string {
    return this.baseUrl + environment.userBasePath;
  }

  public getDeleteUserUrl(userId: number): string {
    return this.baseUrl + environment.userBasePath + '/' + userId;
  }
}
