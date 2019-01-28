import { Driver } from '../../models/Driver';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProvider } from '../user/userProvider';
import { environment } from '../Utils/environment';
import { Observable } from 'rxjs';

@Injectable()
export class DriverProvider {

  private DRIVER_URL = environment.SERVER_URL + "/drivers";
  private USER_URL = environment.SERVER_URL + "/users";

  constructor(public http: HttpClient,
    private userProvider: UserProvider
    ) {}

  getDriver():Observable<Driver> {
    return this.http
      .get<Driver>(`${this.USER_URL}/find/${this.userProvider.getUserId()}`);
  };

  updateDriver(driver: Driver){
    return this.http
      .put<Driver>(`${this.DRIVER_URL}/update/${this.userProvider.getUserId()}`, driver);
  }
}
