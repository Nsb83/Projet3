package fr.autostopfrance.Autostop.models;

import com.google.maps.model.LatLng;
/**
 * Object with a "proximity index" attribute used in the matching algorithm. 
 * The proximityIndex attribute is calculated when comparing two {@link LatLng}.
 * It is the sum of absolute differences in latitude and longitude.
 *
 * @see 		LatLng
 */	
public class AlgoObject {
	
	private LatLng coordinate;
	
	private double proximityIndex;

	public AlgoObject() {
		
	}

	public AlgoObject(LatLng coordinate, double proximityIndex) {
		this.coordinate = coordinate;
		this.proximityIndex = proximityIndex;
	}

	public LatLng getCoordinate() {
		return coordinate;
	}

	public void setCoordinate(LatLng coordinate) {
		this.coordinate = coordinate;
	}

	public double getProximityIndex() {
		return proximityIndex;
	}

	public void setProximityIndex(double proximityIndex) {
		this.proximityIndex = proximityIndex;
	}
	
}
