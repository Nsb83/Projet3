export class Driver {
  name: string;
  surname: string;
  avatar: string;
  rating: number;
  phoneNumber : string;

  destination: string;

  carName: string;
  carColor : string;
  plateCar: string;


  constructor(
    name: string,
    surname: string,
    avatar: string,
    rating: number,
    phoneNumber : string,
    destination: string,
    carName: string,
    carColor : string,
    plateCar : string,

    )
  {
    this.name = name;
    this.surname = surname;
    this.avatar = avatar;
    this.rating = rating;
    this.phoneNumber = phoneNumber;
    this.destination = destination;
    this.carName = carName;
    this.carColor = carColor;
    this.plateCar = plateCar;

  }
}
