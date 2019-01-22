export class Pedestrian {
  private passengersNumber: number;
  private searchRadius: number;

  constructor(passengersNumber?: number, searchRadius?: number) {
    this.passengersNumber = passengersNumber;
    this.searchRadius = searchRadius;
  }

  public getPassengersNumber(): number {
    return this.passengersNumber;
  }

  public setPassengersNumber(passengersNumber: number): void {
    this.passengersNumber = passengersNumber;
  }

  public getSearchRadius(): number {
    return this.searchRadius;
  }

  public setSearchRadius(searchRadius: number): void {
    this.searchRadius = searchRadius;
  }
}
