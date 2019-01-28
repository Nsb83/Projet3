import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { environment } from '../Utils/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class UserProvider {

  private user: User;
  private userId;
  private localUser: User;

  // private isVehiculed: boolean;

  constructor(public http: HttpClient) {
  }

  getUserId() {
    return localStorage.getItem("userId");
  }

  setUserId(userId) {
    localStorage.setItem("userId", userId);
    this.userId = userId;
  }

  createUser(user: User) {
    let createUserUrl = environment.SERVER_URL + "/users/create";
    return this.http.post<User>(createUserUrl, user, httpOptions)
  };

  getUser():Observable<User> {
    const user: User = new User();
    this.http
      .get<User>(`${environment.SERVER_URL}/users/find/${this.getUserId()}`).subscribe((response: any) => {
        
        user.setPublicId(response.publicId);
        user.setLastName(response.lastName);
        user.setFirstName(response.firstName);
        user.setPhone(response.phone);
        user.setSex(response.sex);
        user.setDateOfBirth(response.dateOfBirth);
        user.setEmail(response.email);
        user.setPassword(response.password);
        user.setVehiculed(response.vehiculed);
        if (response.uploadPicture.fileDownloadUri !== null) {
          user.setImgUrl(response.uploadPicture.fileDownloadUri);
        } else {
          user.setImgUrl('./assets/imgs/profileImg.png');
        }
        user.setDriver(response.driver);
        user.setPedestrian(response.pedestrian);
        user.setTrip(response.trip);
        
      });
    return Observable.of(user);
  };

  updateUser(user: User) {
    return this.http
      .put<User>(`${environment.SERVER_URL}/users/update/${this.getUserId()}`, user);
  }
}
