package fr.autostopfrance.Autostop.models;

import org.hibernate.annotations.Cascade;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;

import java.time.LocalDate;
import java.util.Date;
import javax.persistence.*;

@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long idUser;
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
//    @Temporal(TemporalType.DATE)
    @Column(name="date_of_birth")
    private LocalDate dateOfBirth;
    @OneToOne(cascade = CascadeType.ALL)
    public Account account;



    public User () {}

//    public User (String lastName, String firstName, String phone, String sex, LocalDate dateOfBirth, Account account) {
//        this.lastName = lastName;
//        this.firstName = firstName;
//        this.phone = phone;
//        this.sex = sex;
//        this.dateOfBirth = dateOfBirth;
//        account = new Account(account.getEmail(), account.getPassword());
//    }

    public User (String lastName, String firstName, String phone, String imgUrl, String sex, LocalDate dateOfBirth, String email, String password) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.phone = phone;
        this.imgUrl = imgUrl;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.account = new Account(email, password);
    }

    public Long getId() {
        return idUser;
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
        return " User: " + idUser +" " + firstName + " " + lastName + " " + dateOfBirth + " " + sex + " " + phone + " " + imgUrl + account.getEmail() + account.getPassword() + " !";
    }
}
