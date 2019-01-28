package fr.autostopfrance.Autostop.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.maps.model.LatLng;

import fr.autostopfrance.Autostop.models.AlgoObject;

@Service
public class FilterMatchService {
	
	@Autowired
	MatchService matchService;
	
	public boolean filterItineraries(List<LatLng> driverItinerary, LatLng pedestrianLatLng, int searchRadius) {
		
		ArrayList<LatLng> filteredItineraries = new ArrayList<LatLng>();
		
		ArrayList<AlgoObject> algoTable = matchService.getAlgoTable(driverItinerary, pedestrianLatLng);
		
		LatLng driverNearestStep = matchService.getNearestDriverStep(algoTable, pedestrianLatLng);
		System.out.println(" ");
		System.out.println("Driver nearest coordinate : " + driverNearestStep.toString());
		
		long distance = matchService.calculateDistance(pedestrianLatLng, driverNearestStep);
		System.out.println(" ");
		System.out.println("Distance between driver nearest coordinate and pedestrian : " + distance + " mètres");
		
		boolean areUsersMatchable = matchService.areUsersMatchable(searchRadius, distance);
		System.out.println(" ");
		System.out.println("Résultat algo : " + areUsersMatchable);
		
		return areUsersMatchable;

	}

}

