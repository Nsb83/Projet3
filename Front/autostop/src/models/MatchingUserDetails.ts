import { Driver } from "./Driver";
import { Pedestrian } from "./Pedestrian";
import { Trip } from "./Trip";

export class MatchingUserDetails {
    publicId: string;
    lastName: string;
    firstName: string;
    phone: string;
    sex: string;
    dateOfBirth: string;
    vehiculed: boolean;
    uploadPicture: any;
    driver: Driver;
    pedestrian: Pedestrian;
    trip: Trip;

    constructor(
        lastName?: string,
        firstName?: string,
        phone?: string,
        sex?: string,
        dateOfBirth?: string,
        vehiculed?:boolean,
        uploadPicture?:any,
        driver?:Driver,
        pedestrian?:Pedestrian,
        trip?: Trip,
        publicId?: string
       ){
        this.lastName = lastName;
        this.firstName = firstName;
        this.phone = phone;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.vehiculed = vehiculed;
        this.uploadPicture = uploadPicture;
        this.driver = driver;
        this.pedestrian = pedestrian;
        this.trip = trip;
        this.publicId = publicId;
       }
       
    public getPublicId(): string {
        return this.publicId;
    }

    public setPublicId(publicId: string): void {
        this.publicId = publicId;
    }

    public isVehiculed(){
      return this.vehiculed;
    }

    public setVehiculed(vehiculed:boolean){
      this.vehiculed = vehiculed;
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

    public getUploadPicture(): string {
        return this.uploadPicture;
    }

    public setUploadPicture(uploadPicture: any): void {
        this.uploadPicture = uploadPicture;
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

    public setDriver(driver: Driver) {
        this.driver = driver;
    }

    public getDriver() {
        return this.driver;
    }

    public setPedestrian(pedestrian: Pedestrian) {
        this.pedestrian = pedestrian;
    }

    public getPedestrian() {
        return this.pedestrian;
    }

    public setTrip(trip: Trip) {
        this.trip = trip;
    }

    public getTrip() {
        return this.trip;
    }
}