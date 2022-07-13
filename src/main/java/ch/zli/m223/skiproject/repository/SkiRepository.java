package ch.zli.m223.skiproject.repository;

import ch.zli.m223.skiproject.domain.Ski;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkiRepository extends JpaRepository<Ski, Long> {
}
