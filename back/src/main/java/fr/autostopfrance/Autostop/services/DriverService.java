package fr.autostopfrance.Autostop.services;

import fr.autostopfrance.Autostop.models.*;
import fr.autostopfrance.Autostop.repositories.MatchingDAO;
import fr.autostopfrance.Autostop.repositories.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DriverService {

    @Autowired
    UserDAO userDAO;

    @Autowired
    MatchingDAO matchingDAO;

    public ResponseEntity<User> addOrUpdateDriver (String publicId, Driver driver) {
        System.out.println("Updating Driver " + publicId);
        User currentUser = userDAO.findByPublicId(publicId);

        currentUser.getDriver().setBrand(driver.getBrand());
        currentUser.getDriver().setModel(driver.getModel());
        currentUser.getDriver().setColor(driver.getColor());
        currentUser.getDriver().setLicensePlate(driver.getLicensePlate());

        userDAO.save(currentUser);
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

    /**
     * Upload car picture for driver
     *
     * @param publicId
     * @param uploadPicture
     */

    public ResponseEntity<User> postCarPicture (String publicId, UploadPicture uploadPicture) {
        User currentUser = userDAO.findByPublicId(publicId);
        if (currentUser != null) {
            Driver driver = currentUser.getDriver();
            UploadPicture fileResponse = driver.getUploadPicture();

            fileResponse.setFileName(uploadPicture.getFileName());
            fileResponse.setFileDownloadUri(uploadPicture.getFileDownloadUri());
            fileResponse.setFileType(uploadPicture.getFileType());
            fileResponse.setSize(uploadPicture.getSize());

            userDAO.save(currentUser);
        }
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }
}
