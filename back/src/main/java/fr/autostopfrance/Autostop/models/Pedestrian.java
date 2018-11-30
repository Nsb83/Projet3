package fr.autostopfrance.Autostop.models;

import java.util.ArrayList;

public class Pedestrian extends Profile{
    private int passengersNumber;

    public Pedestrian (int passengersNumber) {
        super();
        this.passengersNumber = passengersNumber;
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

}
