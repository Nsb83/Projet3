package fr.autostopfrance.Autostop.models;


import javax.persistence.*;
import java.util.LinkedList;


@Entity
@Table(name="driver")
public class Driver {

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
    private UploadPicture uploadPicture;

    private LinkedList<MatchingEntity> requests;


    public Driver () {
        this.uploadPicture = new UploadPicture();
    }

    public Driver(String licensePlate, String brand, String model, String color, UploadPicture uploadPicture){
        this.licensePlate = licensePlate;
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.uploadPicture = new UploadPicture();
    }

    public Driver(String licensePlate, String brand, String model, String color, LinkedList<MatchingEntity> requests){
        this.licensePlate = licensePlate;
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.uploadPicture = new UploadPicture();
        this.requests = requests;
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

    public UploadPicture getUploadPicture() {
        return uploadPicture;
    }

    public void setUploadPicture(UploadPicture uploadPicture) {
        this.uploadPicture = uploadPicture;
    }

    public void acceptTrip(){
    }

    public void declineTrip(){
    }

    public void rateTrip(Pedestrian pedestrian, int note){
        
    }

    public LinkedList<MatchingEntity> getRequests() {
        return requests;
    }

    public void setRequests(LinkedList<MatchingEntity> requests) {
        this.requests = requests;
    }

    @Override
    public String toString() {
        return "Driver{" +
                "id=" + id +
                ", licensePlate='" + licensePlate + '\'' +
                ", brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", color='" + color + '\'' +
                ", uploadPicture=" + uploadPicture +
                ", requests=" + requests +
                '}';
    }
}
