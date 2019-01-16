import { LatLng, ILatLng } from "@ionic-native/google-maps";

export class Trip {
    origin: LatLng;
    destinationString: string;
    destinationLatLng: ILatLng;
    itinerary: LatLng[];


  constructor(
    origin: LatLng,
    destinationString: string,
    destinationLatLng: ILatLng,
    itinerary: LatLng[],
  )

  {
    this.origin = origin;
    this.destinationString = destinationString;
    this.destinationLatLng = destinationLatLng;
    this.itinerary = itinerary;
  }
}
