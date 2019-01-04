import { Account } from "./Account";

export class User {
    private lastName: string;
    private firstName: string;
    private phone: string;
    private imgUrl: string;
    private sex: string;
    private dateOfBirth: string;
    private email: string;
    private password: string;

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }


    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getPhone(): string {
        return this.phone;
    }

    public setPhone(phone: string): void {
        this.phone = phone;
    }

    public getImgUrl(): string {
        return this.imgUrl;
    }

    public setImgUrl(imgUrl: string): void {
        this.imgUrl = imgUrl;
    }

    public getSex(): string {
        return this.sex;
    }

    public setSex(sex: string): void {
        this.sex = sex;
    }

    public getDateOfBirth(): string {
        return this.dateOfBirth;
    }

    public setDateOfBirth(dateOfBirth: string): void {
        this.dateOfBirth = dateOfBirth;
    }

    // public setAccount(account: Account): void {
    //     this.account = account;
    // }

    // public getAccount(): Account {
    //     return this.account;
    // }

    // private account:Account;

   constructor(
    lastName?: string,
    firstName?: string,
    phone?: string,
    sex?: string,
    dateOfBirth?: string,
    email?:string,
    password?:string
   ){
    this.lastName = lastName;
    this.firstName = firstName;
    this.phone = phone;
    this.sex = sex;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.password = password;
    // this.account = new Account(email, password);
   }
   
}
