package fr.autostopfrance.Autostop.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.DistanceMatrixApi;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.LatLng;

import fr.autostopfrance.Autostop.models.AlgoObject;
import fr.autostopfrance.Autostop.models.Trip;
import fr.autostopfrance.Autostop.models.User;

@Service
public class MatchService {

	private String apiKey = "AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44";
	
	public ArrayList<AlgoObject> getAlgoTable(ArrayList<LatLng> itinerary, LatLng pedestrianLatLng) {
		
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
			results = DistanceMatrixApi.getDistanceMatrix(context, origins, destinations).await();
			Gson gson = new GsonBuilder().setPrettyPrinting().create();
			System.out.println(gson.toJson(results));
			distance = results.rows[0].elements[0].distance.inMeters;
		} catch (ApiException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
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
	
}
