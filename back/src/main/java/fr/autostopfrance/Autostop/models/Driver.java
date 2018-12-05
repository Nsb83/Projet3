package fr.autostopfrance.Autostop.models;

public class Driver extends Profile{
    private String licensePlate;
    private String brand;
    private String model;
    private String color;
    private String imgCar;

    public Driver(String licensePlate, String brand, String model, String color, String imgCar){
        super();
        this.licensePlate = licensePlate;
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.imgCar = imgCar;
    }

    public Driver(String licensePlate, String brand, String model, String color){
        super();
        this.licensePlate = licensePlate;
        this.brand = brand;
        this.model = model;
        this.color = color;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getImgCar() {
        return imgCar;
    }

    public void setImgCar(String imgCar) {
        this.imgCar = imgCar;
    }

    public void acceptTrip(){
    }

    public void declineTrip(){
    }

    public void rateTrip(Pedestrian pedestrian, int note){
        
    }
}
