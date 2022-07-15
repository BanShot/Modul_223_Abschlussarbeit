package ch.zli.m223.skiproject.repository;

import ch.zli.m223.skiproject.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Nicola Werlen
 * @version 15.07.2022
 * Modul: x
 */
public interface MemberRepository extends JpaRepository<Member, Long> {
}
