package fr.autostopfrance.Autostop.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.maps.model.LatLng;

import fr.autostopfrance.Autostop.models.AlgoObject;

@Service
public class FilterMatchService {
	
	@Autowired
	MatchService matchService;
	
	public boolean filterItineraries(ArrayList<LatLng> driverItinerary, LatLng pedestrianLatLng, int searchRadius) {
		
//		ArrayList<LatLng> filteredItineraries = new ArrayList<LatLng>();
		
//		ArrayList<AlgoObject> algoTable = matchService.getAlgoTable(driverItinerary, pedestrianLatLng);
//		
//		LatLng driverNearestStep = matchService.getNearestDriverStep(algoTable, pedestrianLatLng);
//		System.out.println(" ");
//		System.out.println("Driver nearest coordinate : " + driverNearestStep.toString());
//		
//		long distance = matchService.calculateDistance(pedestrianLatLng, driverNearestStep);
//		System.out.println(" ");
//		System.out.println("Distance between driver nearest coordinate and pedestrian : " + distance + " mètres");
//		
//		boolean areUsersMatchable = matchService.areUsersMatchable(searchRadius, distance);
//		System.out.println(" ");
//		System.out.println("Résultat algo : " + String.valueOf(areUsersMatchable));
		
//		return areUsersMatchable;
		
		return true;
	}
	

}

// À SUPPRIMER APRÈS VÉRIFICATION DE L'ALGO

//LatLng pedestrianLocation = new LatLng(45.7462409, 4.8268639);
//
//LatLng driverNearestStep = new LatLng(45.7462409,4.9);
//
//int searchRadius = 19000;
//
//AlgoObject[] algoTable = {
//						  new AlgoObject(new LatLng(45.8421521, 4.9512112), 1),
//						  new AlgoObject(new LatLng(45.54212, 4.75151), 0.5),
//						  new AlgoObject(new LatLng(45.457277, 4.58565), 4),
//						  new AlgoObject(new LatLng(45.746248, 4.9), 0.0001),
//						  new AlgoObject(new LatLng(45.45647, 4.889865), 0.0003259)
//						  };
//
//ArrayList<LatLng> itinerary = {
//					  new LatLng(45.8421521, 4.9512112),
//					  new LatLng(45.54212, 4.75151),
//					  new LatLng(45.457277, 4.58565),
//					  new LatLng(45.746248, 4.9),
//					  new LatLng(45.45647, 4.889865)
//					};
//
//MatchService matchService = new MatchService();
//
//ArrayList<AlgoObject> algoTable = matchService.getAlgoTable(itinerary, pedestrianLocation);
//
//LatLng driverNearestStep = matchService.getNearestDriverStep(algoTable, pedestrianLocation);
//System.out.println(" ");
//System.out.println("Driver nearest coordinate : " + driverNearestStep.toString());
//
//long distance = matchService.calculateDistance(pedestrianLocation, driverNearestStep);
//System.out.println(" ");
//System.out.println("Distance between driver nearest coordinate and pedestrian : " + distance + " mètres");
//
//boolean areUsersMatchable = matchService.areUsersMatchable(searchRadius, distance);
//System.out.println(" ");
//System.out.println("Résultat algo : " + String.valueOf(areUsersMatchable));
