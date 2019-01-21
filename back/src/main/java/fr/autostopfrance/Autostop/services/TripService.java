package fr.autostopfrance.Autostop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import fr.autostopfrance.Autostop.models.Trip;
import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.repositories.UserDAO;

@Service
public class TripService {

	@Autowired
	UserDAO userDAO;
	
	public ResponseEntity<User> updateTrip(String publicId, Trip trip) {
		
		System.out.println("Updating user's (" + publicId + ") trip.");
		
		User currentUser = userDAO.findByPublicId(publicId);
		
		currentUser.getTrip().setOrigin(trip.getOrigin());
		currentUser.getTrip().setDestinationString(trip.getDestinationString());
//		currentUser.getTrip().setDestinationLatLng(trip.getDestinationLatLng());
//		currentUser.getTrip().setItinerary(trip.getItinerary());

//		Gson gson = new GsonBuilder().setPrettyPrinting().create();
//		System.out.println(gson.toJson(currentUser));
		
		userDAO.save(currentUser);
		return new ResponseEntity<>(currentUser, HttpStatus.OK);
	}
}
