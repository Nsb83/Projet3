package fr.autostopfrance.Autostop.models;

import java.util.ArrayList;

public class Trip {
    private String origin;
    private String destination;
    private Object itinerary;

    public Trip(String origin, String destination, Object itinerary){
        this.origin = origin;
        this.destination = destination;
        this.itinerary = itinerary;
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
