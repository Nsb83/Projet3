package fr.autostopfrance.Autostop.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.maps.model.EncodedPolyline;
import com.google.maps.model.LatLng;

import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.services.FilterMatchService;
import fr.autostopfrance.Autostop.services.UserService;

@RestController
@RequestMapping()
@CrossOrigin(origins = {"http://localhost:8000"})
public class MatchController {
	
	@Autowired
	FilterMatchService filterMatchService;
	
	@Autowired
	UserService userService;
	
	@GetMapping (path = "/getmatchingdrivers", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<User> getMatchingDriversAround(@RequestBody User pedestrian) {
		
		List<User> matchingDrivers = new ArrayList<User>();
		
		List<User> allDrivers = userService.findAllDrivers();
		
		LatLng pedestrianStartLatLng = pedestrian.getTrip().getOrigin();
		
		LatLng pedestrianLastLatLng = pedestrian.getTrip().getDestinationLatLng();
		
		int searchRadius = pedestrian.getPedestrian().getSearchRadius();
		
		
		for (User driver : allDrivers) {

			EncodedPolyline driverOverviewPolyline = driver.getTrip().getItinerary();
			
			List<LatLng> driverItinerary = driverOverviewPolyline.decodePath();
			
		    if (filterMatchService.filterItineraries(driverItinerary, pedestrianStartLatLng, searchRadius)) {
		    	matchingDrivers.add(driver);
		    }
		}
		
		System.out.println("pedestrianStartLatLng: " + pedestrianStartLatLng.toString());

		System.out.println("pedestrianLastLatLng: " + pedestrianLastLatLng.toString());

		System.out.println("searchRadius: " + searchRadius);
		
		return matchingDrivers;
	}
	
	@GetMapping (path = "/algomatch", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
    public boolean areUsersMatchable(ArrayList<LatLng> driverItinerary, LatLng pedestrianLatLng, Integer searchRadius) {

		return filterMatchService.filterItineraries(driverItinerary, pedestrianLatLng, searchRadius);
	}
	
	
	
}
