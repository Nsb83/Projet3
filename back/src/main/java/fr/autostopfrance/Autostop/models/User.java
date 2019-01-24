package fr.autostopfrance.Autostop.models;

import java.time.LocalDate;
import javax.persistence.*;

@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="public_id")
    private String publicId;
    @Column(name="last_name")
    private String lastName;
    @Column(name="first_name")
    private String firstName;
    @Column(name="phone")
    private String phone;
    @Column(name="sex")
    private String sex;
    @Column(name="date_of_birth")
    private LocalDate dateOfBirth;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "vehiculed")
    private boolean vehiculed;

    @OneToOne(cascade = CascadeType.ALL)
    private UploadPicture uploadPicture;

    @OneToOne(cascade = CascadeType.ALL)
    private Driver driver;

    @OneToOne(cascade = CascadeType.ALL)
    private Pedestrian pedestrian;

    @OneToOne(cascade = CascadeType.ALL)
    private Trip trip;

    public User () {
        this.vehiculed = false;
        this.uploadPicture = new UploadPicture();
        this.driver = new Driver();
        this.pedestrian = new Pedestrian();
        this.trip = new Trip();
    }

    public User (String publicId, String lastName, String firstName, String phone, String sex,
                 LocalDate dateOfBirth, String email, String password) {
        this.publicId = publicId;
        this.lastName = lastName;
        this.firstName = firstName;
        this.phone = phone;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
        this.vehiculed = false;
    }

    public User (String publicId, String lastName, String firstName, String phone, String sex,
                 LocalDate dateOfBirth, String email, String password, boolean vehiculed) {
        this.publicId = publicId;
        this.lastName = lastName;
        this.firstName = firstName;
        this.phone = phone;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
        this.vehiculed = vehiculed;
        
    }

    public User (String publicId, String lastName, String firstName, String phone, String sex, LocalDate dateOfBirth,
                 String email, String password, UploadPicture uploadPicture, Driver driver, Pedestrian pedestrian, Trip trip) {
        this.publicId = publicId;
        this.lastName = lastName;
        this.firstName = firstName;
        this.phone = phone;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
        this.uploadPicture = new UploadPicture();
        this.driver = new Driver();
        this.pedestrian = new Pedestrian();
        this.trip = new Trip();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUploadPicture(UploadPicture uploadPicture) {
        this.uploadPicture = uploadPicture;
    }

    public UploadPicture getUploadPicture() {return uploadPicture;}

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public Pedestrian getPedestrian() {
        return pedestrian;
    }

    public void setPedestrian(Pedestrian pedestrian) {
        this.pedestrian = pedestrian;
    }

    public boolean isVehiculed() {
        return vehiculed;
    }

    public void setVehiculed(boolean vehiculed) {
        this.vehiculed = vehiculed;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", publicId='" + publicId + '\'' +
                ", lastName='" + lastName + '\'' +
                ", firstName='" + firstName + '\'' +
                ", phone='" + phone + '\'' +
                ", sex='" + sex + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", vehiculed=" + vehiculed +
                ", uploadPicture=" + uploadPicture +
                ", driver=" + driver +
                ", pedestrian=" + pedestrian +
                ", trip=" + trip +
                '}';
    }
}

