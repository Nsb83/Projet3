package fr.autostopfrance.Autostop.services;

import fr.autostopfrance.Autostop.models.Driver;
import fr.autostopfrance.Autostop.repositories.DriverDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;



import javax.persistence.*;
import javax.swing.text.html.parser.Entity;
import java.util.List;
import java.util.Optional;

@Service
public class DriverService {

    @Autowired
    DriverDAO driverDAO;

 

    public Driver postDriver(Driver driver) {

       return driverDAO.save(driver);
   }

    public ResponseEntity<String> deleteUser(long idUser) {
      driverDAO.deleteById(idUser);
      return new ResponseEntity<>("Driver has been deleted!", HttpStatus.OK);
   }

  public Optional<Driver> findById(long idUser) {
      return driverDAO.findById(idUser);
   }

   public ResponseEntity<Driver> updateUser (long idDriver, Driver driver) {
      System.out.println("Updating Driver " + idDriver);

      Optional<Driver> currentDriverOptional = driverDAO.findById(idDriver);

      if (!currentDriverOptional.isPresent()) {
          System.out.println("Driver with id " + idDriver + " not found");
          return new ResponseEntity<Driver>(HttpStatus.NOT_FOUND);
      }

      Driver currentDriver = currentDriverOptional.get();

      currentDriver.setBrand(driver.getBrand());
      currentDriver.setColor(driver.getColor());
      currentDriver.setImgCar(driver.getImgCar());
      currentDriver.setLicensePlate(driver.getLicensePlate());
      currentDriver.setModel(driver.getModel());
      driverDAO.save(currentDriver);
      return new ResponseEntity<>(currentDriver, HttpStatus.OK);
  }

}