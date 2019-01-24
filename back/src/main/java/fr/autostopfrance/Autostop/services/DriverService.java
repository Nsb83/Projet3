package fr.autostopfrance.Autostop.services;

import fr.autostopfrance.Autostop.models.*;
import fr.autostopfrance.Autostop.repositories.MatchingDAO;
import fr.autostopfrance.Autostop.repositories.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.ListIterator;
import java.util.Set;

@Service
public class DriverService {

    @Autowired
    UserDAO userDAO;

    @Autowired
    MatchingDAO matchingDAO;

    public ResponseEntity<User> addOrUpdateDriver (String publicId, Driver driver) {
        System.out.println("Updating Driver " + publicId);
        User currentUser = userDAO.findByPublicId(publicId);

//        User currentUser = currentUserOptional.get();
        currentUser.getDriver().setBrand(driver.getBrand());
        currentUser.getDriver().setModel(driver.getModel());
        currentUser.getDriver().setColor(driver.getColor());
        currentUser.getDriver().setLicensePlate(driver.getLicensePlate());

        userDAO.save(currentUser);
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

    public ResponseEntity<User> postCarPicture (String publicId, UploadPicture uploadPicture) {
        User currentUser = userDAO.findByPublicId(publicId);
//        User currentUser = new User();
        if (currentUser != null) {
//            currentUser = currentUserOptional.get();
            Driver driver = currentUser.getDriver();
            UploadPicture fileResponse = driver.getUploadPicture();

            System.out.println(fileResponse);
            fileResponse.setFileName(uploadPicture.getFileName());
            fileResponse.setFileDownloadUri(uploadPicture.getFileDownloadUri());
            fileResponse.setFileType(uploadPicture.getFileType());
            fileResponse.setSize(uploadPicture.getSize());

            userDAO.save(currentUser);
        }
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

    public LinkedList<MatchingUserDetails> checkPedestrianRequest (String driverPublicId) {
        LinkedList<MatchingEntity> matchingEntity = matchingDAO.findByDriverPublicId(driverPublicId);
        System.out.println("Matcher " + driverPublicId);
        if (matchingEntity == null)
            throw new UsernameNotFoundException("No travel asked for " + driverPublicId + " yet!");

        LinkedList<MatchingUserDetails> pedestrianList = new LinkedList<MatchingUserDetails>();
        ListIterator<MatchingEntity> it = matchingEntity.listIterator();
        while(it.hasNext()){

            String pedestrianId = it.next().getPedestrianPublicId();
            User pedestrian = userDAO.findByPublicId(pedestrianId);
            
            pedestrianList.add(new MatchingUserDetails(
                    pedestrian.getPublicId(),
                            pedestrian.getLastName(),
                            pedestrian.getFirstName(),
                            pedestrian.getPhone(),
                            pedestrian.getSex(),
                            pedestrian.getDateOfBirth(),
                            pedestrian.isVehiculed(),
                            pedestrian.getUploadPicture(),
                            pedestrian.getDriver(),
                            pedestrian.getTrip()
                    )
            );
        }
        return pedestrianList;

    }
}
