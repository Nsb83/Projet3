package fr.autostopfrance.Autostop.controllers;

import fr.autostopfrance.Autostop.models.Driver;
import fr.autostopfrance.Autostop.services.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("drivers")
@CrossOrigin(origins = {"http://localhost:8000"})
public class DriverController {

    @Autowired
    DriverService driverService;

    @PutMapping(path = "/update/{idUser}", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
    public void addOrUpdateDriver(@PathVariable("idUser") String publicId, @RequestBody Driver driver){
        driverService.addOrUpdateDriver(publicId, driver);
    }
}
