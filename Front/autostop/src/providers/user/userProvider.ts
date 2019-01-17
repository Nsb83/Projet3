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

  private isVehiculed: boolean;

  constructor(public http: HttpClient) {
  }

  // Dev Only
  setIsVehiculed(param) {
    this.isVehiculed = param;
  }
  getIsVehiculed() {
    return this.isVehiculed;
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

  getUser() {
    const user: User = new User();
    this.http
      .get<User>(`${environment.SERVER_URL}/users/find/${this.getUserId()}`).subscribe((response: any) => {
        user.setLastName(response.lastName);
        user.setFirstName(response.firstName);
        user.setPhone(response.phone);
        user.setSex(response.sex);
        user.setDateOfBirth(response.dateOfBirth);
        user.setEmail(response.email);
        user.setPassword(response.password);
        if (response.uploadPicture.fileDownloadUri !== null) {
          user.setImgUrl(response.uploadPicture.fileDownloadUri);
        } else {
          user.setImgUrl('./assets/imgs/profileImg.png');
        }
      });

    return user;
  };

  updateUser(user: User) {
    return this.http
      .put<User>(`${environment.SERVER_URL}/users/update/${this.getUserId()}`, user);
  }
}
