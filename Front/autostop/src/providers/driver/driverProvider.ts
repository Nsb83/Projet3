import { Driver } from '../../models/Driver';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProvider } from '../user/userProvider';
import { environment } from '../Utils/environment';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable()
export class DriverProvider {

  private DRIVER_URL = environment.SERVER_URL + "/drivers";
  private USER_URL = environment.SERVER_URL + "/users";

  constructor(public http: HttpClient,
    private userProvider: UserProvider
    ) {}

  getDriver():Observable<Driver> {
    const driver: Driver = new Driver();
    this.http
      .get<User>(`${this.USER_URL}/find/${this.userProvider.getUserId()}`).subscribe((response: any) => {
        driver.setLicensePlate(response.driver.licensePlate);
        driver.setBrand(response.driver.brand);
        driver.setModel(response.driver.model);
        driver.setColor(response.driver.color);
        driver.setImgCarUrl(response.driver.uploadPicture.fileDownloadUri);
      });
      
      return Observable.of(driver);
  };

  updateDriver(driver: Driver){
    return this.http
      .put<Driver>(`${this.DRIVER_URL}/update/${this.userProvider.getUserId()}`, driver);
  }
}
