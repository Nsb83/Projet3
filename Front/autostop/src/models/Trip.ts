import { LatLng, ILatLng } from "@ionic-native/google-maps";

export class Trip {
    origin: LatLng;
    destinationString: string;
    destinationLatLng: ILatLng;
    itinerary: LatLng[];
    isAccepted: boolean;

  constructor(
    origin?: LatLng,
    destinationString?: string,
    destinationLatLng?: ILatLng,
    itinerary?: LatLng[],
  )

  {
    this.origin = origin;
    this.destinationString = destinationString;
    this.destinationLatLng = destinationLatLng;
    this.itinerary = itinerary;
    this.isAccepted = false;
  }

  public getOrigin(): LatLng {
    return this.origin;
  }

  public setOrigin(origin: LatLng): void {
    this.origin = origin;
  }


  public getDestinationString(): string {
    return this.destinationString;
  }

  public setDestinationString(destinationString: string): void {
    this.destinationString = destinationString;
  }


  public getDestinationLatLng(): ILatLng {
    return this.destinationLatLng;
  }

  public setDestinationLatLng(destinationLatLng: ILatLng): void {
    this.destinationLatLng = destinationLatLng;
  }

  public getItinerary(): LatLng[] {
    return this.itinerary;
  }

  public setItinerary(itinerary: LatLng[]): void {
    this.itinerary = itinerary;
  }
  public getIsAccepted(): boolean {
    return this.isAccepted;
  }

  public setIsAccepted(isAccepted: boolean): void {
    this.isAccepted = isAccepted;
  }

}
