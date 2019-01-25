package fr.autostopfrance.Autostop.services;

import fr.autostopfrance.Autostop.models.Driver;
import fr.autostopfrance.Autostop.models.MatchingEntity;
import fr.autostopfrance.Autostop.models.Pedestrian;
import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.repositories.MatchingDAO;
import fr.autostopfrance.Autostop.repositories.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.LinkedList;

@Service
public class PedestrianService {

    @Autowired
    UserDAO userDAO;

    @Autowired
    MatchingDAO matchingDAO;

    public ResponseEntity<User> addOrUpdatePedestrian (String publicId, Pedestrian pedestrian) {
        System.out.println("Updating Pedestrian " + publicId);
        User currentUser = userDAO.findByPublicId(publicId);

        currentUser.getPedestrian().setPassengersNumber(pedestrian.getPassengersNumber());
        currentUser.getPedestrian().setSearchRadius(pedestrian.getSearchRadius());

        userDAO.save(currentUser);
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

    public MatchingEntity registerMatchingDriver (String pedestrianPublicId, MatchingEntity matchingEntity) {
        System.out.println("Updating MatchingEntity" + matchingEntity);
//
//        String matchingDriverId = matchingEntity.getDriverPublicId();
//        User user = userDAO.findByPublicId(matchingDriverId);
//        Driver driver = user.getDriver();
//        LinkedList<MatchingEntity> matchingEntities = driver.getRequests();

        MatchingEntity _matchingEntity = new MatchingEntity(
                matchingEntity.getDriverPublicId(),
                matchingEntity.getPedestrianPublicId()
    			);

        matchingDAO.save(_matchingEntity);
//        matchingEntities.addLast(_matchingEntity);
        return _matchingEntity;
    }
}
