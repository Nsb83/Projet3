export class MatchingEntity {

    private driverPublicId: String;
    private pedestrianPublicId: String;

    constructor(driverPublicId: String, pedestrianPublicId: String){
        this.driverPublicId = driverPublicId;
        this.pedestrianPublicId = pedestrianPublicId;
    }

    public getDriverPublicId(){
        return this.driverPublicId;
    }

    public setDriverPublicId(driverPublicId) {
        this.driverPublicId = driverPublicId;
    }

    public getPedestrianublicId() {
        return this.pedestrianPublicId;
    }

    public setPedestrianPublicId(pedestrianPublicId) {
        this.pedestrianPublicId = pedestrianPublicId;
    }
}