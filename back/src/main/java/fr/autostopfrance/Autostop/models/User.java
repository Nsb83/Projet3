package fr.autostopfrance.Autostop.models;
import fr.autostopfrance.Autostop.utils.UploadFileResponse;

import java.time.LocalDate;
import javax.persistence.*;

@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId")
    private Long id;
    @Column(name="last_name")
    private String lastName;
    @Column(name="first_name")
    private String firstName;
    @Column(name="phone")
    private String phone;
    @Column(name="img_url")
    private String imgUrl;
    @Column(name="sex")
    private String sex;
    @Column(name="date_of_birth")
    private LocalDate dateOfBirth;

    @OneToOne(cascade = CascadeType.ALL)
    private Account account;

    @OneToOne(cascade = CascadeType.ALL)
    private UploadFileResponse uploadFileResponse;


    public User () {}

    public User (String lastName, String firstName, String phone, String sex, LocalDate dateOfBirth, String email, String password) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.phone = phone;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.account = new Account(email, password);
    }

    public User (String lastName, String firstName, String phone, String sex, LocalDate dateOfBirth, String email, String password, String fileDownloadUri) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.phone = phone;
//        this.imgUrl = imgUrl;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.account = new Account(email, password);
        this.uploadFileResponse = new UploadFileResponse(fileDownloadUri);
    }

    public Long getId() {
        return id;
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

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
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

    @Override
    public String toString() {
        return " User: " + id +" " + firstName + " " + lastName + " " + dateOfBirth + " " + sex + " " + phone + " " + imgUrl + " !";
    }

    public Account getAccount() {
        return account;
    }

    public UploadFileResponse getUploadFileResponse() {return uploadFileResponse;}
}
