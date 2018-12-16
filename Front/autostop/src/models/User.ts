import { Account } from "./Account";

export class User {
    lastName: string;
    firstName: string;
    phone: string;
    imgUrl: string;
    sex: string;
    dateOfBirth: string;
    account:Account;

   constructor(
    lastName: string,
    firstName: string,
    phone: string,
    sex: string,
    dateOfBirth: string,
    email:string,
    password:string
   ){
    this.lastName = lastName;
    this.firstName = firstName;
    this.phone = phone;
    this.sex = sex;
    this.dateOfBirth = dateOfBirth;
    this.account = new Account(email, password);
   }

}
