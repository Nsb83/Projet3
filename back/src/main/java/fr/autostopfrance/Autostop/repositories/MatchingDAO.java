package fr.autostopfrance.Autostop.repositories;

import fr.autostopfrance.Autostop.models.MatchingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.LinkedList;
import java.util.Optional;
import java.util.Set;

@Repository
public interface MatchingDAO extends JpaRepository<MatchingEntity, Long> {
    LinkedList<MatchingEntity> findByDriverPublicId(String driverPublicId);
}
