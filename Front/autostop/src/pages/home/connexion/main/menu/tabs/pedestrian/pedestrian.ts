import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserProvider } from '../../../../../../../providers/user/userProvider';
import { User } from '../../../../../../../models/User';
import { MessageProvider } from '../../../../../../../providers/Messages/MessageProvider';
import { HttpErrorResponse } from '@angular/common/http';
import { Pedestrian } from '../../../../../../../models/Pedestrian';
import { PedestrianProvider } from '../../../../../../../providers/Pedestrian/PedestrianProvider';

@Component({
  selector: 'page-pedestrian',
  templateUrl: 'pedestrian.html',
})
export class PedestrianPage implements OnInit{
  user: User;
  pedestrian: Pedestrian;
  pedestrianUpdate: Pedestrian;
  private updatePedestrian: FormGroup;
  userId = this.userService.getUserId();
  passengersNumber: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private userService: UserProvider,
    private messageService: MessageProvider,
    private pedestrianService: PedestrianProvider,
    private events: Events) {}


  ngOnInit() {
    this.initForm();
    this.pedestrianService.getPedestrian().subscribe((data: any) => {
      this.pedestrian = data;
      this.passengersNumber = data.passengersNumber
    });
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
    this.events.publish('user:changed', '');

    this.pedestrianUpdate = new Pedestrian(
      updatePedestrian.passengersNumber,
      updatePedestrian.searchRadius,
    );

    this.pedestrianService.updatePedestrian(this.pedestrianUpdate).subscribe(() => {
      this.events.publish('user:changed', '');
      this.pedestrianService.getPedestrian().subscribe((response) => {
        this.pedestrian = response;
      });
      this.messageService.myToastMethod("Vos préférences sont enregistrées")
    }, (error: HttpErrorResponse) => {
      this.messageService.myToastMethod(`Une erreur est survenue, veuillez réessayer`);
    }
    );
  }
}
