package fr.autostopfrance.Autostop.controllers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.maps.model.LatLng;

import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.services.FilterMatchService;
import fr.autostopfrance.Autostop.services.MatchService;
import fr.autostopfrance.Autostop.services.UserService;

@RestController
@RequestMapping()
@CrossOrigin(origins = {"http://localhost:8000"})
public class MatchController {
	
	@Autowired
	FilterMatchService filterMatchService;
	
	@Autowired
	UserService userService;
	
	@GetMapping (path = "/test")
	 public String test() {
		return "Coucou";
	}
	
	@GetMapping (path = "/getallusers", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<User> getAllUsersAround(@RequestBody User pedestrian) {
		
		List<User> response = new ArrayList<User>();
		
		List<User> allDrivers = userService.findAllDrivers();
		
		LatLng pedestrianStartLatLng = pedestrian.getTrip().getItinerary().get(0);
		
		LatLng pedestrianLastLatLng = pedestrian.getTrip().getItinerary().get(pedestrian.getTrip().getItinerary().size() - 1);
		
		int searchRadius = pedestrian.getPedestrian().getSearchRadius();
		
		
		for (User driver : allDrivers) {

			ArrayList<LatLng> driverItinerary = driver.getTrip().getItinerary();
			
		    if (filterMatchService.filterItineraries(driverItinerary, pedestrianStartLatLng, searchRadius)) {
		    	response.add(driver);
		    }
		}
		
		System.out.println("pedestrianStartLatLng: " + pedestrianStartLatLng.toString());

		System.out.println("pedestrianLastLatLng: " + pedestrianLastLatLng.toString());

		System.out.println("searchRadius: " + searchRadius);
		
		return response;
	}
	
	@GetMapping (path = "/algomatch", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
    public boolean areUsersMatchable(ArrayList<LatLng> driverItinerary, LatLng pedestrianLatLng, Integer searchRadius) {

		return filterMatchService.filterItineraries(driverItinerary, pedestrianLatLng, searchRadius);
	}
	
	
	
}
