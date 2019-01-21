import { LatLng, ILatLng } from "@ionic-native/google-maps";

export class Trip {
    origin: ILatLng;
    destinationString: string;
    destinationLatLng: ILatLng;
    itinerary: string;
    accepted: boolean;

  constructor(
    origin?: ILatLng,
    destinationString?: string,
    destinationLatLng?: ILatLng,
    itinerary?: string,
  )

  {
    this.origin = origin;
    this.destinationString = destinationString;
    this.destinationLatLng = destinationLatLng;
    this.itinerary = itinerary;
    this.accepted = false;
  }

  public getOrigin(): ILatLng {
    return this.origin;
  }

  public setOrigin(origin: ILatLng): void {
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

  public getItinerary(): string {
    return this.itinerary;
  }

  public setItinerary(itinerary: string): void {
    this.itinerary = itinerary;
  }
  public isAccepted(): boolean {
    return this.accepted;
  }

  public setAccepted(accepted: boolean): void {
    this.accepted = accepted;
  }

}
