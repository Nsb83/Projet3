package fr.autostopfrance.Autostop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import fr.autostopfrance.Autostop.models.Driver;

@Repository
public interface DriverDAO extends JpaRepository <Driver, Long> {

}
