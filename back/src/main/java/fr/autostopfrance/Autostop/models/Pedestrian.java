package fr.autostopfrance.Autostop.models;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name="pedestrian")
public class Pedestrian
//        extends Profile
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int passengersNumber;
    private int searchRadius;

    public Pedestrian () {
        this.passengersNumber = 1;
        this.searchRadius = 300;
    }

    public Pedestrian (int passengersNumber, int searchRadius) {
//        super();
        this.passengersNumber = passengersNumber;
        this.searchRadius = searchRadius;

    }

    public int getPassengersNumber() {
        return passengersNumber;
    }

    public void setPassengersNumber(int passengersNumber) {
        this.passengersNumber = passengersNumber;
    }

    public void askForTrip(){
    }

    public void canceltrip(){
    }
    public void rateTrip(Driver driver, int note){
        
    }

    public int getSearchRadius() {
        return searchRadius;
    }

    public void setSearchRadius(int searchRadius) {
        this.searchRadius = searchRadius;
    }
}
