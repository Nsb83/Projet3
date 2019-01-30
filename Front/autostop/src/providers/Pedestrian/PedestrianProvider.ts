import { Injectable } from "@angular/core";
import { User } from "../../models/User";
import { Pedestrian } from "../../models/Pedestrian";
import { environment } from "../Utils/environment";
import { HttpClient } from "@angular/common/http";
import { UserProvider } from "../user/userProvider";
import { Observable } from "rxjs";

@Injectable()
export class PedestrianProvider {
    private PEDESTRIAN_URL = environment.SERVER_URL + "/pedestrian";
    private USER_URL = environment.SERVER_URL + "/users";


    constructor(public http: HttpClient, private userProvider: UserProvider) {}

    getPedestrian(): Observable<Pedestrian> {
      const pedestrian: Pedestrian = new Pedestrian();
      this.http
        .get<User>(`${this.USER_URL}/find/${this.userProvider.getUserId()}`).subscribe((response: any) => {
          pedestrian.setPassengersNumber(response.pedestrian.passengersNumber);
          pedestrian.setSearchRadius(response.pedestrian.searchRadius)
      });
      return Observable.of(pedestrian);
    };

    updatePedestrian(pedestrian: Pedestrian){
      return this.http
        .put<Pedestrian>(`${this.PEDESTRIAN_URL}/update/${this.userProvider.getUserId()}`, pedestrian);
    }
}
