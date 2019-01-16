package fr.autostopfrance.Autostop.models;

// import java.util.LinkedList;
import fr.autostopfrance.Autostop.utils.UploadFileResponse;

import javax.persistence.*;


@Entity
@Table(name="driver")
public class Driver
//        extends Profile
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driverId")
    private Long id;
    @Column(name="license_plate")
    private String licensePlate;
    @Column(name="brand")
    private String brand;
    @Column(name="model")
    private String model;
    @Column(name="color")
    private String color;
    @OneToOne(cascade = CascadeType.ALL)
    private UploadFileResponse uploadFileResponse;


    
    // private LinkedList<Trip> tripList;

    public Driver () {
        this.uploadFileResponse = new UploadFileResponse();
    }

    public Driver(String licensePlate, String brand, String model, String color, UploadFileResponse uploadFileResponse){
        // super();
        this.licensePlate = licensePlate;
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.uploadFileResponse = new UploadFileResponse();
    }

    public Driver(String licensePlate, String brand, String model, String color){
        // super();
        this.licensePlate = licensePlate;
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.uploadFileResponse = new UploadFileResponse();
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

    public UploadFileResponse getUploadFileResponse() {
        return uploadFileResponse;
    }

    public void setUploadFileResponse(UploadFileResponse uploadFileResponse) {
        this.uploadFileResponse = uploadFileResponse;
    }

// public LinkedList<Trip> getTripList(){
    //     return tripList;
    // }

    // public void setTripList(LinkedList tripList){
    //     this.tripList = tripList;
    // }

    public void acceptTrip(){
    }

    public void declineTrip(){
    }

    public void rateTrip(Pedestrian pedestrian, int note){
        
    }

    @Override
    public String toString() {
        return "Driver{" + licensePlate + brand + model + color + '}';
    }

}
