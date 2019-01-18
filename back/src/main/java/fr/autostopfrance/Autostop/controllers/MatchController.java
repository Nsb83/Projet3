package fr.autostopfrance.Autostop.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.maps.model.LatLng;

import fr.autostopfrance.Autostop.services.FilterMatchService;

@RestController
@RequestMapping()
@CrossOrigin(origins = {"http://localhost:8000"})
public class MatchController {
	
	@Autowired
	FilterMatchService filterMatchService;
	
	ArrayList<LatLng> itinerary = new ArrayList<LatLng>();
	
	@GetMapping (path = "/algomatch", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
    public boolean areUsersMatchable(ArrayList<LatLng> driverItinerary, LatLng pedestrianLatLng, Integer searchRadius) {

		return filterMatchService.filterItineraries(driverItinerary, pedestrianLatLng, searchRadius);
	}
	
}
