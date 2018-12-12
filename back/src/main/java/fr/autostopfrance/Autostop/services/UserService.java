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

    public User postUser(@RequestBody User user) {
        User _user = userDAO.save(new User(user.getLastName(), user.getFirstName(),
                user.getPhone(), user.getSex(), user.getSex(), user.getDateOfBirth(), user.account.getEmail(), user.account.getPassword()));
        return _user;
//        Account _account = userDAO.save(new Account(account.getEmail(), _account.getPassword()))
    }

    public ResponseEntity<String> deleteUser(@PathVariable("idUser") long idUser) {
        userDAO.deleteById(idUser);
        return new ResponseEntity<>("User has been deleted!", HttpStatus.OK);
    }

}
