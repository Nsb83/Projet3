package fr.autostopfrance.Autostop.models;

import com.google.maps.model.LatLng;

public class AlgoObject {
	
	private LatLng coordinate;
	
	private long proximityIndex;
	
	

	public AlgoObject() {
		
	}

	public AlgoObject(LatLng coordinate, long proximityIndex) {
		this.coordinate = coordinate;
		this.proximityIndex = proximityIndex;
	}

	public LatLng getCoordinate() {
		return coordinate;
	}

	public void setCoordinate(LatLng coordinate) {
		this.coordinate = coordinate;
	}

	public long getProximityIndex() {
		return proximityIndex;
	}

	public void setProximityIndex(long proximityIndex) {
		this.proximityIndex = proximityIndex;
	}
	
}
