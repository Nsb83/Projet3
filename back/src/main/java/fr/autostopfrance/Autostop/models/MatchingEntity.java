package fr.autostopfrance.Autostop.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * A matchingEntity gets created when a pedestrian asks a driver for a trip.
 * <p>
 * It is not yet joined with any other table.
 *
 * @param  accepted true if driver accepted pedestrian's request, false by default
 * 
 * @see         Driver
 * @see 		Pedestrian
 */	
@Entity
public class MatchingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String driverPublicId;
    private String pedestrianPublicId;
    private boolean accepted;

    public MatchingEntity() {}

    public MatchingEntity(String driverPublicId, String pedestrianPublicId) {
        this.driverPublicId = driverPublicId;
        this.pedestrianPublicId = pedestrianPublicId;
    }

    public String getDriverPublicId() {
        return driverPublicId;
    }

    public void setDriverPublicId(String driverPublicId) {
        this.driverPublicId = driverPublicId;
    }

    public String getPedestrianPublicId() {
        return pedestrianPublicId;
    }

    public void setPedestrianPublicId(String pedestrianPublicId) {
        this.pedestrianPublicId = pedestrianPublicId;
    }

	public boolean isAccepted() {
		return accepted;
	}

	public void setAccepted(boolean accepted) {
		this.accepted = accepted;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

    @Override
    public String toString() {
        return "MatchingEntity{" +
                "id=" + id +
                ", driverPublicId='" + driverPublicId + '\'' +
                ", pedestrianPublicId='" + pedestrianPublicId + '\'' +
                ", accepted=" + accepted +
                '}';
    }
}
