import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-give-rating',
  templateUrl: 'give-rating.html',
})
export class GiveRatingPage {
  matchableUser;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.matchableUser = this.navParams.get('matchableUser');
  }


  rating = this.matchableUser.rating;

  COLORS = {
    GREY : "E0E0E0",
    GREEN : "#76FF03",
    YELLOW : "#FFCA28",
    RED : "#DD2C00"
  };
  rate(index: number) {
    this.rating = index;
    // function used to change the value of our rating
    // triggered when user, clicks a star to change the rating
 }

getColor(index: number) {
  if (this.isAboveRating(index)){
    return this.COLORS.GREY;
  }
  switch (this.rating) {
    case 1 :
    case 2 :
      return this.COLORS.RED;
    case 3:
      return this.COLORS.YELLOW;
    case 4:
    case 5:
      return this.COLORS.GREEN;
    default :
      return this.COLORS.GREY;
  }
    /* function to return the color of a star based on what
     index it is. All stars greater than the index are assigned
     a grey color , while those equal or less than the rating are
     assigned a color depending on the rating. Using the following criteria:

          1-2 stars: red
          3 stars  : yellow
          4-5 stars: green
    */
  }

isAboveRating(index: number): boolean {
  return index > this.rating;
  // returns whether or not the selected index is above ,the current rating
  // function is called from the getColor function.
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiveRatingPage');
  }

}
