package fr.autostopfrance.Autostop.controllers;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.maps.model.EncodedPolyline;
import com.google.maps.model.LatLng;

import fr.autostopfrance.Autostop.models.MatchingEntity;
import fr.autostopfrance.Autostop.models.MatchingUserDetails;
import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.services.FilterMatchService;
import fr.autostopfrance.Autostop.services.MatchService;
import fr.autostopfrance.Autostop.services.PedestrianService;
import fr.autostopfrance.Autostop.services.UserService;

@RestController
@RequestMapping()
@CrossOrigin(origins = {"http://localhost:8000"})
public class MatchController {
	
	@Autowired
	FilterMatchService filterMatchService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	PedestrianService pedestrianService;
	
	@Autowired
	MatchService matchService;
	
	/**
	 * Returns list of {@link MatchingUserDetails} using the {@link FilterMatchService} to launch the algorithm.
	 * <p>
	 * This method gets called with an Http.get request when a pedestrian validates his trip.
	 *
	 * @param  publicId	pedestrian's publicId
	 * @return 		list of matching users (drivers)
	 * @see 		FilterMatchService
	 */	
	@GetMapping (path = "/getmatchingdrivers/{publicId}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<MatchingUserDetails> getMatchingDriversAround(@PathVariable("publicId") String publicId) {
		
		List<MatchingUserDetails> matchingDrivers = new ArrayList<MatchingUserDetails>();
		
		User pedestrian = userService.findById(publicId);
		
		List<User> allDrivers = userService.findAllDrivers();
		
		LatLng pedestrianStartLatLng = pedestrian.getTrip().getOrigin();
		
//  	TO RETRIEVE ENDING POINT OF PEDESTRIAN TRIP
//		LatLng pedestrianLastLatLng = pedestrian.getTrip().getDestinationLatLng();
		
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
		return matchingDrivers;
	}
	
	@GetMapping (path = "/getMatchingEntity/{matchingEntityId}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public MatchingEntity getMatchingEntity(@PathVariable("matchingEntityId") Long id) {
		return matchService.getMatchingEntity(id);
	}
	
	@PostMapping(path = "/createMatchingEntity/{idUser}", consumes = { MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public MatchingEntity registerMatchingDriver (@PathVariable("idUser") String publicId, @RequestBody MatchingEntity matchingEntity) {
        return matchService.registerMatchingDriver(publicId, matchingEntity);
    }
	
	@PutMapping(path="/updateMatchingEntity/{matchingEntityId}", consumes = { MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
	public MatchingEntity updateMatchingEntity(@PathVariable("matchingEntityId") Long id, @RequestBody MatchingEntity matchingEntity) {
		return matchService.updateMatchingEntity(id, matchingEntity);
	}
	
	@DeleteMapping(path = "/deleteMatchingEntity/{matchingEntityId}", produces = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<String> deleteMatchingEntity(@PathVariable("matchingEntityId") Long id){
        return matchService.deleteMatchingEntity(id);
    }
	
	@GetMapping(path = "/queryPedestrian/{idUser}", produces =  { MediaType.APPLICATION_JSON_VALUE })
    public LinkedList<MatchingEntity> findById(@PathVariable("idUser") String driverPublicId) {
        return matchService.checkPedestrianRequest(driverPublicId);
    }
}
