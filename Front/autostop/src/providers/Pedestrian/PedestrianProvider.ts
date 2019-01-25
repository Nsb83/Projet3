import { Injectable } from "@angular/core";
import { User } from "../../models/User";
import { Pedestrian } from "../../models/Pedestrian";
import { environment } from "../Utils/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserProvider } from "../user/userProvider";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class PedestrianProvider {
    private user: User;
    private pedestrian: Pedestrian;
    private PEDESTRIAN_URL = environment.SERVER_URL + "/pedestrian";
    private DRIVER_URL = environment.SERVER_URL + "/drivers";
    private USER_URL = environment.SERVER_URL + "/users";

  
    constructor(public http: HttpClient, 
      private userProvider: UserProvider
      ) {}
  
    getPedestrian() {
      const pedestrian: Pedestrian = new Pedestrian();
      this.http
        .get<User>(`${this.USER_URL}/find/${this.userProvider.getUserId()}`).subscribe((response: any) => {
          pedestrian.setPassengersNumber(response.pedestrian.passengersNumber);
          pedestrian.setSearchRadius(response.pedestrian.searchRadius)
      });
      return pedestrian;
    };
  
    updatePedestrian(pedestrian: Pedestrian){
      return this.http
        .put<Pedestrian>(`${this.PEDESTRIAN_URL}/update/${this.userProvider.getUserId()}`, pedestrian);
    }

    sendRequest(matchingEntity) {
      return this.http.post(`${this.PEDESTRIAN_URL}/matchingDriver/${this.userProvider.getUserId()}`, matchingEntity, httpOptions);
    }

    queryPedestrian(){
      return this.http.get(`${this.DRIVER_URL}/queryPedestrian/${this.userProvider.getUserId()}`)
    }

    checkMatchingEntity(matchingEntityId){
      return this.http.get(`${environment.SERVER_URL}/getmatchingentity/${matchingEntityId}`)
    }
}