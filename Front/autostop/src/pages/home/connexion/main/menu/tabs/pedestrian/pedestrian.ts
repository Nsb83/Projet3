import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { UserProvider } from '../../../../../../../providers/user/userProvider';
import { User } from '../../../../../../../models/User';
import { MessageProvider } from '../../../../../../../providers/Messages/MessageProvider';
import { HttpErrorResponse } from '@angular/common/http';
import { Pedestrian } from '../../../../../../../models/Pedestrian';
import { PedestrianProvider } from '../../../../../../../providers/Pedestrian/PedestrianProvider';


/**
 * Generated class for the PedestrianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pedestrian',
  templateUrl: 'pedestrian.html',
})
export class PedestrianPage implements OnInit{
  user: User;
  pedestrian: Pedestrian;
  pedestrianUpdate: Pedestrian;
  private updatePedestrian: FormGroup;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder, 
    private userService: UserProvider,
    private messageService: MessageProvider,
    private pedestrianService: PedestrianProvider) {}

    userId = this.userService.getUserId();

  ngOnInit() {
    this.initForm();
    this.pedestrian = this.pedestrianService.getPedestrian();

  }

  initForm() {
    this.updatePedestrian = this.formBuilder.group(
      {
        searchRadius: [""], 
        passengersNumber: [""],
      },
    );
    }

  validateForm(updatePedestrian) {
    this.pedestrianUpdate = new Pedestrian(
      updatePedestrian.passengersNumber,
      updatePedestrian.searchRadius,
    );

    this.pedestrianService.updatePedestrian(this.pedestrianUpdate).subscribe(() => {
      console.log(this.pedestrianUpdate)
      this.userService.getUser();
      this.messageService.myToastMethod("Vos préférences sont enregistrées")
    }, (error: HttpErrorResponse) => {
      console.log('Error: ', error);
      this.messageService.myToastMethod(`Une erreur est survenue, veuillez réessayer`);
    }
    );
  }
}
