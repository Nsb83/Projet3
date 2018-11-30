package fr.autostopfrance.Autostop.models;

import java.util.Date;

public class User {
    private String lastName;
    private String firstName;
    private String phone;
    private String mail;
    private String imgUrl;
    private String sex;
    private Date dateOfBirth;

    public User (String lastName, String firstName, String phone, String mail, String sex, Date dateOfBirth) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.phone = phone;
        this.mail = mail;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
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

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
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

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
}
