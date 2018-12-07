package fr.autostopfrance.Autostop.models;

import java.util.ArrayList;

public class Pedestrian extends Profile{
    private int passengersNumber;

    public Pedestrian () {
        super();
        this.passengersNumber = 1;
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
}
