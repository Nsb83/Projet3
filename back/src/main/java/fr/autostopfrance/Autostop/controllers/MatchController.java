package fr.autostopfrance.Autostop.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.maps.model.EncodedPolyline;
import com.google.maps.model.LatLng;

import fr.autostopfrance.Autostop.models.MatchingUserDetails;
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
	
	@GetMapping (path = "/getmatchingdrivers/{publicId}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<MatchingUserDetails> getMatchingDriversAround(@PathVariable("publicId") String publicId) {
		
		List<MatchingUserDetails> matchingDrivers = new ArrayList<MatchingUserDetails>();
		
		User pedestrian = userService.findById(publicId);
		
		List<User> allDrivers = userService.findAllDrivers();
		
		LatLng pedestrianStartLatLng = pedestrian.getTrip().getOrigin();
		
		LatLng pedestrianLastLatLng = pedestrian.getTrip().getDestinationLatLng();
		
		int searchRadius = pedestrian.getPedestrian().getSearchRadius();
		
		for (User driver : allDrivers) {

			EncodedPolyline driverOverviewPolyline = new EncodedPolyline(driver.getTrip().getItinerary());
			
			List<LatLng> driverItinerary = driverOverviewPolyline.decodePath();
			
		    if (filterMatchService.filterItineraries(driverItinerary, pedestrianStartLatLng, searchRadius)) {
		    	matchingDrivers.add(new MatchingUserDetails(driver.getPublicId(),
		    												driver.getLastName(),
		    												driver.getFirstName(),
		    												driver.getPhone(),
		    												driver.getSex(),
		    												driver.getDateOfBirth(),
		    												driver.isVehiculed(),
		    												driver.getUploadPicture(),
		    												driver.getDriver(),
		    												driver.getTrip()
		    												));
		    }
		}
		
		System.out.println("pedestrianStartLatLng: " + pedestrianStartLatLng.toString());

		System.out.println("pedestrianLastLatLng: " + pedestrianLastLatLng.toString());

		System.out.println("searchRadius: " + searchRadius);
		
		return matchingDrivers;
	}	
}
