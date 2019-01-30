package fr.autostopfrance.Autostop.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.DistanceMatrixApi;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.LatLng;
import com.google.maps.model.TravelMode;

import fr.autostopfrance.Autostop.models.AlgoObject;
import fr.autostopfrance.Autostop.models.MatchingEntity;
import fr.autostopfrance.Autostop.repositories.MatchingDAO;

/**
 * Service with all the methods used to "match" pedestrian and drivers.
 * <p>
 * Also contains methods in charge of doing CRUD operations with {@link MatchingEntity}
 * <p><b> Note: Google apiKey needed
 */	
@Service
public class MatchService {
	
	@Autowired
    MatchingDAO matchingDAO;


	private String apiKey = "AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44";
	
	/**
	 * Returns an ArrayList of AlgoObject that can then be used to locate the nearest driver step. 
	 * <p>
	 * The argument itinerary is a List of {@link LatLng} from the driver's route.
	 * The argument pedestrianLatLng is the location of the pedestrian we want the driver's itinerary to be compared to. 
	 *
	 * @param  itinerary  a List of LatLng describing the driver's route
	 * @param  pedestrianLatLng the location of the pedestrian
	 * @return      an array of AlgoObject
	 * @see         AlgoObject
	 * @see 		LatLng
	 */	
	public ArrayList<AlgoObject> getAlgoTable(List<LatLng> itinerary, LatLng pedestrianLatLng) {
		
		ArrayList<AlgoObject> response = new ArrayList<AlgoObject>();
			
		for(int i = 0; i < itinerary.size(); i++) {
			double proximityIndex =  Math.abs(pedestrianLatLng.lat - itinerary.get(i).lat) + Math.abs(pedestrianLatLng.lng - itinerary.get(i).lng);
			AlgoObject element = new AlgoObject(itinerary.get(i), proximityIndex);
			response.add(element);
		}
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		System.out.println(gson.toJson(response));
		
		return response;
		
	}

	/**
	 * Returns a LatLng which represents the location of the nearest step between a driver's itinerary and a pedestrian position. 
	 * <p>
	 * The argument itinerary is a List of {@link LatLng} from the driver's route.
	 * The argument pedestrianLatLng is the location of the pedestrian we want the driver's itinerary to be compared to. 
	 *
	 * @param  algoTable  an ArrayList of AlgoObect
	 * @param  pedestrianLocation
	 * @return      a LatLng representing the nearest position from the pedestrian location to the driver's route
	 * @see         AlgoObject
	 * @see 		LatLng
	 */	
	public LatLng getNearestDriverStep(ArrayList<AlgoObject> algoTable, LatLng pedestrianLocation) {
		
		int index = 0;
		int indexMin = 0;
		
		for (AlgoObject el : algoTable) {
			if (el.getProximityIndex() <= algoTable.get(indexMin).getProximityIndex()) {
				indexMin = index;
			}
			index++;
		}
		
		return algoTable.get(indexMin).getCoordinate();
	}
	
	/**
	 * Calculate the distance in meters between the two {@link LatLng} arguments and returns it. 
	 * <p> The distance is calculated using Google {@link DistanceMatrixApi} API, in WALKING MODE and in METERS.
	 *
	 * @param  		
	 * @return   	the distance in meters between the two arguments
	 * @see 		DistanceMatrixApi
	 * @see			DistanceMatrix
	 * @see 		LatLng
	 */	
	public long calculateDistance(LatLng pedestrianLatLng, LatLng driverNearestStep) {
		
		GeoApiContext context = new GeoApiContext.Builder()
			    .apiKey(apiKey)
			    .build();
		
		String[] origins = { pedestrianLatLng.toUrlValue() };
		
		String[] destinations = { driverNearestStep.toUrlValue() };
		
		long distance = -1;
		
		DistanceMatrix results;
		
		try {
			results = DistanceMatrixApi.getDistanceMatrix(context, origins, destinations).mode(TravelMode.WALKING).await();
			Gson gson = new GsonBuilder().setPrettyPrinting().create();
			System.out.println(gson.toJson(results));
			distance = results.rows[0].elements[0].distance.inMeters;
		} catch (ApiException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return distance;
	}
	
	/**
	 * Returns a boolean depending on the distance of the nearest driver's step
	 * and the searchRadius specified by the pedestrian.
	 *
	 * @param  		
	 * @return   	true if the users are matchable, false if they are not
	 */	
	public boolean areUsersMatchable(int pedestrianSearchRadius, long distance) {
		if (distance >= 0 && distance <= pedestrianSearchRadius) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * Create a new {@link MatchingEntity} in the database, using {@link MatchingDAO}, and returns it.
	 *
	 * @param  		
	 * @return   	the matchingEntity just added to the database
	 * @see			MatchingEntity
	 * @see 		MatchingDAO
	 */	
    public MatchingEntity registerMatchingDriver (String pedestrianPublicId, MatchingEntity matchingEntity) {
        System.out.println("Updating MatchingEntity" + matchingEntity);

        MatchingEntity _matchingEntity = new MatchingEntity(
                matchingEntity.getDriverPublicId(),
                matchingEntity.getPedestrianPublicId()
    			);

        matchingDAO.save(_matchingEntity);
        return _matchingEntity;
    }
    
    /**
	 * Returns the {@link MatchingEntity}'s attribute "accepted" (true or false) retrieved from the database with the id of the matchingEntity.
	 *
	 * @param  		
	 * @see			MatchingEntity
	 * @see 		MatchingDAO
	 */	
    public MatchingEntity getMatchingEntity(Long id) {
    	Optional<MatchingEntity> matchingEntity = matchingDAO.findById(id);
    	
    	MatchingEntity _matchingEntity = matchingEntity.get();
    	
    	return _matchingEntity;
    }
    
    /**
	 * @param  	matchingEntity	the new MatchingEntity	
	 * @see			MatchingEntity
	 * @see 		MatchingDAO
	 */	
	public MatchingEntity updateMatchingEntity(Long id, MatchingEntity matchingEntity) {
		
		Optional<MatchingEntity> optionalMatchingEntity = matchingDAO.findById(id);
		MatchingEntity _matchingEntity = optionalMatchingEntity.get();
		_matchingEntity.setAccepted(matchingEntity.isAccepted());
		_matchingEntity.setDeclined(matchingEntity.isDeclined());
		
		matchingDAO.save(_matchingEntity);
		
		return _matchingEntity;
	}
	
	/**
	 * Returns a List of {@link MatchingEntity} retrieved from the database with the publicId of a {@link Driver}.
	 * <p>
	 * This method is usually called from the front-end using a polling strategy (every X seconds).
	 *
	 * @param  		
	 * @see			MatchingEntity
	 * @see 		MatchingDAO
	 */	
	public LinkedList<MatchingEntity> checkPedestrianRequest (String driverPublicId) {
        LinkedList<MatchingEntity> matchingEntities = matchingDAO.findByDriverPublicId(driverPublicId);
        if (matchingEntities == null)
            throw new UsernameNotFoundException("No travel asked for " + driverPublicId + " yet!");
        
        return matchingEntities;
    }

	/**
	 * @param  		
	 * @see			MatchingEntity
	 * @see 		MatchingDAO
	 */	
	public ResponseEntity<String> deleteMatchingEntity(Long id) {
		Optional<MatchingEntity> matchingEntity = matchingDAO.findById(id);
        matchingDAO.delete(matchingEntity.get());
        return new ResponseEntity<>("MatchingEntity with id=" + id + " has been deleted!", HttpStatus.OK);
	}
	
}
