export class User {
    licensePlate: string;
    brand: string;
    model: string;
    color: string;
    imgCar: string;

  constructor(
    licensePlate: string,
    brand: string,
    model: string,
    color: string,
    imgCar: string,

    )
  {
    this.licensePlate = licensePlate;
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.imgCar = imgCar;
  }
}
