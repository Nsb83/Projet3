package fr.autostopfrance.Autostop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.autostopfrance.Autostop.models.Trip;
import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.services.TripService;


@RestController
@CrossOrigin(origins = {"http://localhost:8000"})
@RequestMapping("trips")
public class TripController {

	@Autowired
	TripService tripService;
	
	@PutMapping(path = "/update/{publicId}", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<User> addOrUpdateTrip(@PathVariable("publicId") String publicId, @RequestBody Trip trip){
        return tripService.updateTrip(publicId, trip);
    }
	
	
}
