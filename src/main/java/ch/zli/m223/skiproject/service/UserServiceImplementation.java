package ch.zli.m223.skiproject.service;

import ch.zli.m223.skiproject.domain.Role;
import ch.zli.m223.skiproject.domain.User;
import ch.zli.m223.skiproject.repository.RoleRepository;
import ch.zli.m223.skiproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jvnet.hk2.annotations.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author Nicola Werlen
 * @version 14.07.2022
 * Modul: x
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImplementation implements UserService{
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    @Override
    public User saveUser(User user) {
        log.info("Saving new user to the database", user.getName());
        return userRepository.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new Role {} to the database", role.getName());
        return roleRepository.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to user {}", roleName, username);
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
    }

    @Override
    public User getUser(String username) {
        log.info("Fetching user {}", username);
        return userRepository.findByUsername(username);
    }

    @Override
    public List<User> getUsers() {
        log.info("Fetching all users");
        return userRepository.findAll();
    }
}
