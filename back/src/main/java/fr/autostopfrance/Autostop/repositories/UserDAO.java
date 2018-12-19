package fr.autostopfrance.Autostop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import fr.autostopfrance.Autostop.models.User;

@Repository
public interface UserDAO extends JpaRepository <User, Long> {
}