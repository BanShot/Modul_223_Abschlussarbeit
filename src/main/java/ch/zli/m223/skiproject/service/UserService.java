package ch.zli.m223.skiproject.service;

import ch.zli.m223.skiproject.domain.Role;
import ch.zli.m223.skiproject.domain.User;

import java.util.List;

/**
 * @author Nicola Werlen
 * @version 14.07.2022
 * Modul: x
 */
public interface UserService {
    User saveUser(User user);
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    User getUser(String username);
    List<User> getUsers();
}
