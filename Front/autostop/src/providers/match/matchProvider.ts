import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Utils/environment';
import { UserProvider } from '../user/userProvider';
import { MatchingUserDetails } from '../../models/MatchingUserDetails';
import { MatchingEntity } from '../../models/MatchingEntity';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable()
export class MatchProvider {

  constructor(public http: HttpClient, 
              private userProvider: UserProvider) {
    console.log('Hello MatchingEntityProvider Provider');
  }

  sendRequest(matchingEntity) {
    return this.http.post(`${environment.SERVER_URL}/createMatchingEntity/${this.userProvider.getUserId()}`, matchingEntity, httpOptions);
  }

  checkMatchingEntity(matchingEntityId){
    return this.http.get(`${environment.SERVER_URL}/getmatchingentity/${matchingEntityId}`)
  }

  updateMatchingEntity(matchingEntity: any) {
    return this.http.put(`${environment.SERVER_URL}/updateMatchingEntity/${matchingEntity.id}`, matchingEntity);
  }

  getMatchingDriversAround() {
    return this.http
      .get<MatchingUserDetails[]>(`${environment.SERVER_URL}/getmatchingdrivers/${this.userProvider.getUserId()}`);
  }

  queryPedestrian() {
    return this.http.get(`${environment.SERVER_URL}/queryPedestrian/${this.userProvider.getUserId()}`)
  }
}
