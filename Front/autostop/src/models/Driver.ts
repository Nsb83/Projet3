export class Driver {
    private licensePlate: string;
    private brand: string;
    private model: string;
    public _color: string;
    private imgCarUrl: string;

  constructor(
    licensePlate?: string,
    brand?: string,
    model?: string,
    color?: string)
  {
    this.licensePlate = licensePlate;
    this.brand = brand;
    this.model = model;
    this._color = color;
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

public get color(): string {
    return this.color;
}

public setColor(color: string): void {
    this._color = color;
}

public getImgCarUrl(): string {
    return this.imgCarUrl;
}

public set ImgCarUrl(imgCarUrl: string){
    this.imgCarUrl = imgCarUrl;
}
}
