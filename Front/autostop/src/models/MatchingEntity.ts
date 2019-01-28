export class MatchingEntity {

    accepted: boolean;

    constructor(driverPublicId: string, pedestrianPublicId: string){
        this.driverPublicId = driverPublicId;
        this.pedestrianPublicId = pedestrianPublicId;
    }

    public get driverPublicId(){
        return this.driverPublicId;
    }

    public set driverPublicId(driverPublicId) {
        this.driverPublicId = driverPublicId;
    }

    public get pedestrianPublicId() {
        return this.pedestrianPublicId;
    }

    public set pedestrianPublicId(pedestrianPublicId) {
        this.pedestrianPublicId = pedestrianPublicId;
    }
    
    
}