import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of'; 
import { EmailValidator } from '@angular/forms';
import { from } from 'rxjs/observable/from';
// import { Account } from '../../models/Account';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable()
export class UserProvider {

  private user: User;
  private isDriver: boolean;
  private isPedestrian: boolean;
  private URL_DB = "http://localhost:8080/users";

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }
  
  setDriverProfile() {
    this.isDriver = true;
    this.isPedestrian = false;
  }

  setPedestrianProfile() {
    this.isDriver = false;
    this.isPedestrian = true;
  }

  getDriverProfile(){
    return this.isDriver;
  }

  getPedestrianProfile(){
    return this.isPedestrian;
  }



// *********************************************
//            METHOD TO BE TESTED
// *********************************************
testServer(){
  let obs = this.http.get(this.URL_DB + "/findAll");
  obs.subscribe((response) => console.log(response));
}  

createUser(user: User) {
    let createUserUrl = this.URL_DB + "/create";
    console.log(createUserUrl);
    return this.http.post<User>(createUserUrl, user, httpOptions)
  };

  getUser() {
    const user: User = new User();
    this.http.get<User>(this.URL_DB + "/find/1").subscribe((response: any) => {
     
      console.log(response);
      
        user.setLastName(response.lastName);
        user.setFirstName(response.firstName);
        user.setPhone(response.phone);
        user.setSex(response.sex);
        user.setDateOfBirth(response.dateOfBirth);
        // const account: Account = new Account(response.account.email, response.account.password);
        // user.setAccount(account);
        user.setEmail(response.email);
        user.setPassword(response.password);
        user.setImgUrl(response.uploadFileResponse.fileDownloadUri);
      
        console.log('REPONSE' , user)
    });

  return user;
};

// *********************************************
}
