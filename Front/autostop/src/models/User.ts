export class User {
    lastName: string;
    firstName: string;
    phone: string;
    mail: string;
    imgUrl: string;
    sex: string;
    dateOfBirth: string;

   constructor(
    lastName: string,
    firstName: string,
    phone: string,
    mail: string,
    imgUrl: string,
    sex: string,
    dateOfBirth: string,
   ){
    this.lastName = lastName;
    this.firstName = firstName;
    this.phone = phone;
    this.mail = mail;
    this.imgUrl = imgUrl;
    this.sex = sex;
    this.dateOfBirth = dateOfBirth;
   }

}
