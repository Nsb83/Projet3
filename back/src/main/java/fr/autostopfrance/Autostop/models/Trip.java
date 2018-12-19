package fr.autostopfrance.Autostop.models;

import java.util.ArrayList;

public class Trip {
    private String origin;
    private String destination;
    private boolean isAccepted;
    private String state;
    private Object itinerary;


    public Trip(String origin, String destination){
        this.origin = origin;
        this.destination = destination;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public boolean isAccepted() {
        return isAccepted;
    }

    public void setAccepted(String isAccepted) {
//        this.isAccepted = isAccepted;
    }

    public String gestState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Object getItinerary() {
        return itinerary;
    }

    public void setItinerary(Object itinerary) {
        this.itinerary = itinerary;
    }

    public ArrayList<Object> calculateTrip(){
        return null;
    }
}
