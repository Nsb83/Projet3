import { Driver } from '../../models/Driver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProvider } from '../user/userProvider';
import { User } from '../../models/User';
const TOKEN_KEY = 'AuthToken';

const httpOptions = {
  headers: new HttpHeaders(
  {
    'Authorization': this.tokenId
  })
};

@Injectable()
export class DriverProvider {

  private user: User;
  private tokenId;
  private driver: Driver;
  private DRIVER_URL = "http://localhost:8080/drivers";
  private USER_URL = "http://localhost:8080/users";


  constructor(public http: HttpClient, 
    private userProvider: UserProvider
    ) {
    console.log('Hello DriverProvider Provider');
  }

  // getToken(){
  //   this.tokenId = localStorage.getItem(TOKEN_KEY);
  //   console.log(this.tokenId);
  //   // console.log(this.httpOptions)
  //   return this.tokenId;
  // }

  // createDriver(driver: Driver) {
  //   let createDriverUrl = this.URL_DB + "/create";
  //   console.log(createDriverUrl);
  //   console.log(driver);
  //   return this.http.post<Driver>(createDriverUrl, driver, httpOptions)
  // };

  getDriver() {
    const driver: Driver = new Driver();
    this.http
      .get<User>(`${this.USER_URL}/find/${this.userProvider.getUserId()}`).subscribe((response: any) => {

        console.log("getUserId dans driverService " + response);

        driver.setBrand(response.driver.brand);
        driver.setModel(response.driver.model);
        driver.setLicensePlate(response.driver.licensePlate);
        driver.setColor(response.driver.color);
        driver.setImgCarUrl(response.driver.uploadPicture.fileDownloadUri);

        // if (response.uploadPicture.fileDownloadUri !== null) {
        //   user.setImgUrl(response.uploadPicture.fileDownloadUri);
        // } else {
        //   user.setImgUrl('./assets/imgs/profileImg.png');
        // }

        console.log('REPONSE' , driver)
    });

    return driver;
  };

  updateDriver(driver: Driver){
    return this.http
      .put<Driver>(`${this.DRIVER_URL}/update/${this.userProvider.getUserId()}`, driver);
  }

}
