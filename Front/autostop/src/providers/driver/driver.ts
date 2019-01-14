import { Driver } from './../../models/Driver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const TOKEN_KEY = 'AuthToken';

const httpOptions = {
  headers: new HttpHeaders(
  {
    'Authorization': this.tokenId
  })
};

@Injectable()
export class DriverProvider {

  private tokenId;
  private driver: Driver;
  private URL_DB = "http://localhost:8080/drivers";


  constructor(public http: HttpClient) {
    console.log('Hello DriverProvider Provider');
  }

  getToken(){
    this.tokenId = localStorage.getItem(TOKEN_KEY);
    console.log(this.tokenId);
    // console.log(this.httpOptions)
    return this.tokenId;
  }

  createDriver(driver: Driver) {
    let createDriverUrl = this.URL_DB + "/create";
    console.log(createDriverUrl);
    console.log(driver);
    return this.http.post<Driver>(createDriverUrl, driver, httpOptions)
  };

  // getDriver() {
  //   const driver: Driver = new Driver();
  //   this.http
  //     .get<Driver>(`${this.URL_DB}/find/${this.getUserId()}`).subscribe((response: any) => {

  //       console.log(response);

  //       user.setLastName(response.lastName);
  //       user.setFirstName(response.firstName);
  //       user.setPhone(response.phone);
  //       user.setSex(response.sex);
  //       user.setDateOfBirth(response.dateOfBirth);
  //       user.setEmail(response.email);
  //       user.setPassword(response.password);
  //       if (response.uploadFileResponse.fileDownloadUri !== null) {
  //         user.setImgUrl(response.uploadFileResponse.fileDownloadUri);
  //       } else {
  //         user.setImgUrl('./assets/imgs/profileImg.png');
  //       }

  //       // console.log('REPONSE' , user)
  //   });

  //   return driver;
  // };

}
