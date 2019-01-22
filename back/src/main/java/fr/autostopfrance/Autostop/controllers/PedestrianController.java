package fr.autostopfrance.Autostop.controllers;

import fr.autostopfrance.Autostop.models.Driver;
import fr.autostopfrance.Autostop.models.Pedestrian;
import fr.autostopfrance.Autostop.services.DriverService;
import fr.autostopfrance.Autostop.services.PedestrianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:8000"})
@RequestMapping("pedestrian")
public class PedestrianController {

    @Autowired
    PedestrianService pedestrianService;

    @PutMapping(path = "/update/{idUser}", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
    public void addOrUpdatePedestrian(@PathVariable("idUser") String publicId, @RequestBody Pedestrian pedestrian){
        pedestrianService.addOrUpdatePedestrian(publicId, pedestrian);
    }

}
