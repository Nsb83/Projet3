package fr.autostopfrance.Autostop.controllers;

import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.repositories.UserDAO;
import fr.autostopfrance.Autostop.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/findAll")
    public List<User> findUsers() {
        return userService.findUsers();
    }

    @PostMapping("/create")
    public void postUser(@RequestBody User user) {
        userService.postUser(user);
    }

    @DeleteMapping("/delete/{idUser}")
    public void deleteUser(@PathVariable("idUser") long idUser){
        userService.deleteUser(idUser);
    }
}
