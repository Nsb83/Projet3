package fr.autostopfrance.Autostop.services;

import fr.autostopfrance.Autostop.models.Account;
import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.repositories.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserDAO userDAO;

    public List<User> findUsers() {
        return userDAO.findAll();
    }

    public User postUser(User user) {
        User _user = userDAO.save(new User(
                user.getLastName(), user.getFirstName(),
                user.getPhone(), user.getSex(), user.getImgUrl(),
                user.getDateOfBirth(),
                user.getAccount().getEmail(), user.getAccount().getPassword()
                ));
        return _user;
    }

    public ResponseEntity<String> deleteUser(long idUser) {
        userDAO.deleteById(idUser);
        return new ResponseEntity<>("User has been deleted!", HttpStatus.OK);
    }

}
