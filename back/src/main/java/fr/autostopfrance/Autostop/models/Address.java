package fr.autostopfrance.Autostop.models;

public class Address {
    private int number;
    private String street;
    private int zip;
    private String city;
    private String country;

    public Address(int number, String street, int zip, String city, String country){
        this.number = number;
        this.street = street;
        this.zip = zip;
        this.city = city;
        this.country = country;
    }

    public Address(String street, String city){
        this.street = street;
        this.city = city;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public int getZip() {
        return zip;
    }

    public void setZip(int zip) {
        this.zip = zip;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
