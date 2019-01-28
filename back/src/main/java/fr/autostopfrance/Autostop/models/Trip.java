package fr.autostopfrance.Autostop.models;

import javax.persistence.*;

import com.google.maps.model.LatLng;

import java.util.ArrayList;

@Entity
@Table(name="trip")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tripId")
    private Long id;
    @Column(name="origin")
    private LatLng origin;
    @Column(name="destination_string")
    private String destinationString;
    @Column(name="destination_lat_lng")
    private LatLng destinationLatLng;
    @Column(name="accepted")
    private boolean accepted;
    @Column(name="itinerary", columnDefinition = "text")
    private String itinerary;
//    private int 

    public Trip () {
    }

    public Trip(LatLng origin, String destinationString, LatLng destinationLatLng, String itinerary){
        this.origin = origin;
        this.destinationString = destinationString;
        this.destinationLatLng = destinationLatLng;
    	this.itinerary = itinerary;
    }

    public LatLng getOrigin() {
        return origin;
    }

    public void setOrigin(LatLng origin) {
        this.origin = origin;
    }

    public String getDestinationString() {
        return destinationString;
    }

    public void setDestinationString(String destination) {
        this.destinationString = destination;
    }
    
    public LatLng getDestinationLatLng() {
        return destinationLatLng;
    }

    public void setDestinationLatLng(LatLng destinationLatLng) {
        this.destinationLatLng = destinationLatLng;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public String getItinerary() {
        return itinerary;
    }

    public void setItinerary(String itinerary) {
        this.itinerary = itinerary;
    }

    public ArrayList<Object> calculateTrip(){
        return null;
    }
}
