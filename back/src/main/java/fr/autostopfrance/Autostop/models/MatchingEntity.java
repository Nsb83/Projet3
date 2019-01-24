package fr.autostopfrance.Autostop.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class MatchingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String driverPublicId;
    private String pedestrianPublicId;

//    @ManyToOne
//    private Driver driver;

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
}
