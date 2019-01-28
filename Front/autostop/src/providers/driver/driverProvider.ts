import { Driver } from '../../models/Driver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProvider } from '../user/userProvider';
import { User } from '../../models/User';
import { environment } from '../Utils/environment';
import { MatchingUserDetails } from '../../models/MatchingUserDetails';
import { Observable } from 'rxjs';
const TOKEN_KEY = 'AuthToken';

// const httpOptions = {
//   headers: new HttpHeaders(
//   {
//     'Authorization': this.tokenId
//   })
// };

@Injectable()
export class DriverProvider {

  private user: User;
  private driver: Driver;
  private DRIVER_URL = environment.SERVER_URL + "/drivers";
  private USER_URL = environment.SERVER_URL + "/users";
  private pollingPedestrian: any;

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

  getMatchingDriversAround() {
    return this.http
      .get<MatchingUserDetails[]>(`${environment.SERVER_URL}/getmatchingdrivers/${this.userProvider.getUserId()}`);
  }

}
