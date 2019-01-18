package fr.autostopfrance.Autostop.services;

import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.DistanceMatrixApi;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.LatLng;

public class MatchService {

	private String apiKey = "AIzaSyBhqCcaN5OfApXOWr_1b2VkIBQqIwPQK44";
	
	public long calculateDistance(LatLng pedestrianLocation, LatLng driverNearestStep) {
		
		GeoApiContext context = new GeoApiContext.Builder()
			    .apiKey(apiKey)
			    .build();
		
		String[] origins = {pedestrianLocation.toUrlValue()};
		
		String[] destinations = {driverNearestStep.toUrlValue()};
		
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
	
	public boolean areUsersMatchable(int pedestrianSearchRadius, Long distance) {
		if (distance >= 0 && distance <= pedestrianSearchRadius) {
			return true;
		} else {
			return false;
		}
	}
	
}
