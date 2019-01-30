export class MatchingEntity {

    driverPublicId: string;
    pedestrianPublicId: string;
    accepted: boolean;

    constructor(driverPublicId: string, pedestrianPublicId: string){
        this.driverPublicId = driverPublicId;
        this.pedestrianPublicId = pedestrianPublicId;
    }

    public getDriverPublicId(){
        return this.driverPublicId;
    }

    public setDriverPublicId(driverPublicId) {
        this.driverPublicId = driverPublicId;
    }

    public getPedestrianPublicId() {
        return this.pedestrianPublicId;
    }

    public setPedestrianPublicId(pedestrianPublicId) {
        this.pedestrianPublicId = pedestrianPublicId;
    }
    
}