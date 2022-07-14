package ch.zli.m223.skiproject.repository;

import ch.zli.m223.skiproject.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Nicola Werlen
 * @version 14.07.2022
 * Modul: x
 */
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
