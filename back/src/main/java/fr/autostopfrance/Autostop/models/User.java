package fr.autostopfrance.Autostop.models;
import fr.autostopfrance.Autostop.utils.UploadFileResponse;

import java.time.LocalDate;
import javax.persistence.*;

@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // @Column(name = "userID")
    // private String userID;
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


//    @OneToOne(cascade = CascadeType.ALL)
//    private Account account;

    @OneToOne(cascade = CascadeType.ALL)
    private UploadFileResponse uploadFileResponse;

    @OneToOne(cascade = CascadeType.ALL)
    private Driver driver;

    @OneToOne(cascade = CascadeType.ALL)
    private Pedestrian pedestrian;


    public User () {}

    public User (String lastName, String firstName, String phone, String sex, LocalDate dateOfBirth, String email, String password) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.phone = phone;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
    }

    public User (String lastName, String firstName, String phone, String sex, LocalDate dateOfBirth, String email, String password, UploadFileResponse uploadFileResponse, Driver driver, Pedestrian pedestrian) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.phone = phone;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
        this.uploadFileResponse = new UploadFileResponse();
        this.driver = new Driver();
        this.pedestrian = new Pedestrian();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // public String getUserID() {
    //     return userID;
    // }

    // public void setUserID(String userID) {
    //     this.userID = userID;
    // }

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

    public void setUploadFileResponse(UploadFileResponse uploadFileResponse) {
        this.uploadFileResponse = uploadFileResponse;
    }

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

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", lastName='" + lastName + '\'' +
                ", firstName='" + firstName + '\'' +
                ", phone='" + phone + '\'' +
                ", sex='" + sex + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", uploadFileResponse=" + uploadFileResponse +
                ", driver=" + driver +
                ", pedestrian=" + pedestrian +
                '}';
    }

    public UploadFileResponse getUploadFileResponse() {return uploadFileResponse;}
}
