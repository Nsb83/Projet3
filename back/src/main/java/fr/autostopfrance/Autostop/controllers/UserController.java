package fr.autostopfrance.Autostop.controllers;

import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.repositories.UserDAO;
import fr.autostopfrance.Autostop.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:8000"})
@RequestMapping("users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(path = "/test", produces = {MediaType.APPLICATION_JSON_VALUE})
    public String Coucou(){
        return "coucou";
    }

    @GetMapping("/findAll")
    public List<User> findUsers() {
        return userService.findUsers();
    }

    @PostMapping(path = "/create", consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public User postUser(@RequestBody User user) {
        System.out.println("POST USER : " + user);
        User user1 = userService.postUser(user);
        return user1;
    }

    @DeleteMapping("/delete/{idUser}")
    public void deleteUser(@PathVariable("idUser") long idUser){
        userService.deleteUser(idUser);
    }
}
