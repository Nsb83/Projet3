package fr.autostopfrance.Autostop.controllers;

import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
@CrossOrigin(origins = {"http://localhost:8000"})
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(path = "/create", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces =  { MediaType.APPLICATION_JSON_VALUE })
    public User postUser(@RequestBody User user) {
        System.out.println("POST USER : " + user);
        User user1 = userService.postUser(user);
        return user1;
    }

    @GetMapping(path = "/find/{idUser}", produces =  { MediaType.APPLICATION_JSON_VALUE })
    public User findById(@PathVariable("idUser") String publicId) {
        return userService.findById(publicId);}

    @DeleteMapping(path = "/delete/{idUser}", consumes = {  MediaType.APPLICATION_JSON_VALUE })
    public void deleteUser(@PathVariable("idUser") String publicId){
        userService.deleteUser(publicId);
    }

    @PutMapping(path = "/update/{idUser}", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces =  { MediaType.APPLICATION_JSON_VALUE })
    public void updateUser(@PathVariable("idUser") String publicId, @RequestBody User user){
        userService.updateUser(publicId, user);
    }



}
