import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable()
export class UserProvider {

  private user: User;
  private userId;
  private isDriver: boolean;
  private isPedestrian: boolean;
  private URL_DB = "http://localhost:8080/users";

  constructor(public http: HttpClient) {
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

  getUserId() {
    return localStorage.getItem("userId");
  }

  setUserId(userId) {
    localStorage.setItem("userId", userId);
    this.userId = userId;
  }

createUser(user: User) {
    let createUserUrl = this.URL_DB + "/create";
    return this.http.post<User>(createUserUrl, user, httpOptions)
  };

getUser() {
  const user: User = new User();
  this.http
    .get<User>(`${this.URL_DB}/find/${this.getUserId()}`).subscribe((response: any) => {
    
      console.log(response);
    
      user.setLastName(response.lastName);
      user.setFirstName(response.firstName);
      user.setPhone(response.phone);
      user.setSex(response.sex);
      user.setDateOfBirth(response.dateOfBirth);
      user.setEmail(response.email);
      user.setPassword(response.password);
      user.setImgUrl(response.uploadFileResponse.fileDownloadUri);
    
      console.log('REPONSE' , user)
  });

  return user;
};

  updateUser(user: User){
    return this.http
      .put<User>(`${this.URL_DB}/update/${this.getUserId()}`, user);
  }
}
