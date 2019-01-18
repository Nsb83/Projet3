package fr.autostopfrance.Autostop.models;

import javax.persistence.*;

import com.google.maps.model.LatLng;

import java.util.ArrayList;

@Entity
@Table(name="trip")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String origin;
    private String destination;
    private boolean isAccepted;
    private ArrayList<LatLng> itinerary;
//    private int 

    public Trip () {}

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

    public void setAccepted(boolean isAccepted) {
        this.isAccepted = isAccepted;
    }

    public ArrayList<LatLng> getItinerary() {
        return itinerary;
    }

    public void setItinerary(ArrayList<LatLng> itinerary) {
        this.itinerary = itinerary;
    }

    public ArrayList<Object> calculateTrip(){
        return null;
    }
}
