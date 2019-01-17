package fr.autostopfrance.Autostop.services;

import fr.autostopfrance.Autostop.models.Driver;
import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.repositories.UserDAO;
import fr.autostopfrance.Autostop.models.UploadPicture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DriverService {

    @Autowired
    UserDAO userDAO;

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

}
