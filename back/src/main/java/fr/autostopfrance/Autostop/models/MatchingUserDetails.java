package fr.autostopfrance.Autostop.models;

import java.time.LocalDate;

/**
 * Implemented when sending user details to other users when they match.
 * <p>
 * Example in {@link MatchController}.
 */	
public class MatchingUserDetails {
	
    private String publicId;
    private String lastName;
    private String firstName;
    private String phone;
    private String sex;
    private LocalDate dateOfBirth;
    private boolean vehiculed;
    private UploadPicture uploadPicture;
    private Driver driver;
    private Pedestrian pedestrian;
    private Trip trip;

	public MatchingUserDetails() {
		this.uploadPicture = new UploadPicture();
        this.driver = new Driver();
        this.pedestrian = new Pedestrian();
        this.trip = new Trip();
	}
	
	public MatchingUserDetails (String publicId, String lastName, String firstName, String phone, String sex,
								LocalDate dateOfBirth, boolean vehiculed) {
        this.publicId = publicId;
        this.lastName = lastName;
        this.firstName = firstName;
        this.phone = phone;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.vehiculed = vehiculed;
        this.uploadPicture = new UploadPicture();
        this.driver = new Driver();
        this.pedestrian = new Pedestrian();
        this.trip = new Trip();
	}
	
	public MatchingUserDetails (String publicId,
			String lastName,
			String firstName,
			String phone,
			String sex,
			LocalDate dateOfBirth,
			boolean vehiculed,
			UploadPicture uploadPicture,
			Driver driver,
			Trip trip) {
	this.publicId = publicId;
	this.lastName = lastName;
	this.firstName = firstName;
	this.phone = phone;
	this.sex = sex;
	this.dateOfBirth = dateOfBirth;
	this.vehiculed = vehiculed;
	this.uploadPicture = uploadPicture;
	this.driver = driver;
	this.pedestrian = new Pedestrian();
	this.trip = trip;
	}
	
	public MatchingUserDetails (String publicId,
			String lastName,
			String firstName,
			String phone,
			String sex,
			LocalDate dateOfBirth,
			boolean vehiculed,
			UploadPicture uploadPicture,
			Pedestrian pedestrian,
			Trip trip) {
	this.publicId = publicId;
	this.lastName = lastName;
	this.firstName = firstName;
	this.phone = phone;
	this.sex = sex;
	this.dateOfBirth = dateOfBirth;
	this.vehiculed = vehiculed;
	this.uploadPicture = uploadPicture;
	this.driver = new Driver();
	this.pedestrian = pedestrian;
	this.trip = trip;
	}
	
	public MatchingUserDetails (String publicId,
								String lastName,
								String firstName,
								String phone,
								String sex,
								LocalDate dateOfBirth,
								boolean vehiculed,
								UploadPicture uploadPicture,
								Driver driver,
								Pedestrian pedestrian,
								Trip trip) {
        this.publicId = publicId;
        this.lastName = lastName;
        this.firstName = firstName;
        this.phone = phone;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.vehiculed = vehiculed;
        this.uploadPicture = uploadPicture;
        this.driver = driver;
        this.pedestrian = pedestrian;
        this.trip = trip;
	}

	public String getPublicId() {
		return publicId;
	}

	public void setPublicId(String publicId) {
		this.publicId = publicId;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public boolean isVehiculed() {
		return vehiculed;
	}

	public void setVehiculed(boolean vehiculed) {
		this.vehiculed = vehiculed;
	}

	public UploadPicture getUploadPicture() {
		return uploadPicture;
	}

	public void setUploadPicture(UploadPicture uploadPicture) {
		this.uploadPicture = uploadPicture;
	}

	public Driver getDriver() {
		return driver;
	}

	public void setDriver(Driver driver) {
		this.driver = driver;
	}

	public Pedestrian getPedestrian() {
		return pedestrian;
	}

	public void setPedestrian(Pedestrian pedestrian) {
		this.pedestrian = pedestrian;
	}

	public Trip getTrip() {
		return trip;
	}

	public void setTrip(Trip trip) {
		this.trip = trip;
	}

	@Override
	public String toString() {
		return "MatchingUserDetails{" +
				"publicId='" + publicId + '\'' +
				", lastName='" + lastName + '\'' +
				", firstName='" + firstName + '\'' +
				", phone='" + phone + '\'' +
				", sex='" + sex + '\'' +
				", dateOfBirth=" + dateOfBirth +
				", vehiculed=" + vehiculed +
				", uploadPicture=" + uploadPicture +
				", driver=" + driver +
				", pedestrian=" + pedestrian +
				", trip=" + trip +
				'}';
	}
}
