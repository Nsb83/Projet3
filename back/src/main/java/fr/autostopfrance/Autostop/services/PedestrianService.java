package fr.autostopfrance.Autostop.services;

import fr.autostopfrance.Autostop.models.Pedestrian;
import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.repositories.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class PedestrianService {

    @Autowired
    UserDAO userDAO;

    public ResponseEntity<User> addOrUpdatePedestrian (String publicId, Pedestrian pedestrian) {
        System.out.println("Updating Pedestrian " + publicId);
        User currentUser = userDAO.findByPublicId(publicId);

        currentUser.getPedestrian().setPassengersNumber(pedestrian.getPassengersNumber());
        currentUser.getPedestrian().setSearchRadius(pedestrian.getSearchRadius());

        userDAO.save(currentUser);
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }
}
