package fr.autostopfrance.Autostop.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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


@Service
public class MatchService {
	
	@Autowired
    MatchingDAO matchingDAO;


	private String apiKey = "AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44";
	
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
	
	public boolean areUsersMatchable(int pedestrianSearchRadius, long distance) {
		if (distance >= 0 && distance <= pedestrianSearchRadius) {
			return true;
		} else {
			return false;
		}
	}
	

    public MatchingEntity registerMatchingDriver (String pedestrianPublicId, MatchingEntity matchingEntity) {
        System.out.println("Updating MatchingEntity" + matchingEntity);

        MatchingEntity _matchingEntity = new MatchingEntity(
                matchingEntity.getDriverPublicId(),
                matchingEntity.getPedestrianPublicId()
    			);

        matchingDAO.save(_matchingEntity);
        return _matchingEntity;
    }
    
    public boolean getMatchingEntityStatus(Long id) {
    	Optional<MatchingEntity> matchingEntity = matchingDAO.findById(id);
    	
    	MatchingEntity _matchingEntity = matchingEntity.get();
    	
    	return _matchingEntity.isAccepted();
    }
	
}
