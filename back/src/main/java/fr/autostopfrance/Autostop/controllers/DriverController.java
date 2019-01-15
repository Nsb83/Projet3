package fr.autostopfrance.Autostop.controllers;

import fr.autostopfrance.Autostop.models.Driver;
import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.services.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:8000"})
@RequestMapping("drivers")
public class DriverController {

    @Autowired
    DriverService driverService;

    @PutMapping(path = "/update/{idUser}", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
    public void addOrUpdateDriver(@PathVariable("idUser") long idUser, @RequestBody Driver driver){
        driverService.addOrUpdateDriver(idUser, driver);
    }


}
