export class Address {
    number: number;
    street: string;
    zip: number;
    city: string;
    country: string;

  constructor(
    number: number,
    street: string,
    zip: number,
    city: string,
    country: string,
  ){
    this.number = number;
    this.street = street;
    this.zip = zip;
    this.city = city;
    this.country = country;
  }
}
