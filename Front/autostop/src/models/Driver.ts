export class Driver {
    private licensePlate: string;
    private brand: string;
    public model: string;
    public color: string;
    private imgCarUrl: string;

  constructor(
    licensePlate?: string,
    brand?: string,
    model?: string,
    color?: string,
    imgCarUrl?: string)
  {
    this.licensePlate = licensePlate;
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.imgCarUrl = imgCarUrl;
  }

  public getLicensePlate(): string {
      return this.licensePlate;
  }

  public setLicensePlate(licensePlate: string): void {
      this.licensePlate = licensePlate;
  }

  public getBrand(): string {
      return this.brand;
  }

  public setBrand(brand: string): void {
      this.brand = brand;
  }

  public getModel(): string {
      return this.model;
  }

  public setModel(model: string): void {
      this.model = model;
  }

  public getColor(): string {
      return this.color;
  }

  public setColor(color: string): void {
      this.color = color;
  }

  public getImgCarUrl(): string {
      return this.imgCarUrl;
  }

public setImgCarUrl(imgCarUrl: string) {
    this.imgCarUrl = imgCarUrl;
}
}
