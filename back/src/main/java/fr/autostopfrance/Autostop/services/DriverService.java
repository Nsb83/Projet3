package fr.autostopfrance.Autostop.services;

import fr.autostopfrance.Autostop.models.Driver;
import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.repositories.DriverDAO;
import fr.autostopfrance.Autostop.repositories.UserDAO;
import fr.autostopfrance.Autostop.utils.UploadFileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;



import javax.persistence.*;
import javax.swing.text.html.parser.Entity;
import java.util.List;
import java.util.Optional;

@Service
public class DriverService {

    @Autowired
    UserDAO userDAO;

    public ResponseEntity<User> addOrUpdateDriver (long idUser, Driver driver) {
        System.out.println("Updating Driver " + idUser);
        Optional<User> currentUserOptional = userDAO.findById(idUser);

        User currentUser = currentUserOptional.get();
        currentUser.getDriver().setBrand(driver.getBrand());
        currentUser.getDriver().setModel(driver.getModel());
        currentUser.getDriver().setColor(driver.getColor());
        currentUser.getDriver().setLicensePlate(driver.getLicensePlate());

        userDAO.save(currentUser);
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

//    public ResponseEntity<User> postCarPicture (long idUser, UploadFileResponse uploadFileResponse) {
//        Optional<User> currentUserOptional = userDAO.findById(idUser);
//
//        User currentUser = currentUserOptional.get();
//        currentUser.getDriver().getUploadFileResponse().setFileName(uploadFileResponse.getFileName());
//        currentUser.getDriver().getUploadFileResponse().setFileDownloadUri(uploadFileResponse.getFileDownloadUri());
//        currentUser.getDriver().getUploadFileResponse().setFileType(uploadFileResponse.getFileType());
//        currentUser.getDriver().getUploadFileResponse().setSize(uploadFileResponse.getSize());
//
//        userDAO.save(currentUser);
//        return new ResponseEntity<>(currentUser, HttpStatus.OK);
//    }

}
