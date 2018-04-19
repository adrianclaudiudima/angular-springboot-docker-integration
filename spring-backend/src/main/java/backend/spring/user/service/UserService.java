package backend.spring.user.service;

import backend.spring.user.repository.UsersRepository;
import backend.spring.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class UserService {

    private UsersRepository usersRepository;

    @Autowired
    public UserService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Transactional(readOnly = true)
    public User findUserByUsername(String username) {
        return usersRepository.findByUsername(username);
    }

    @Transactional
    public User saveUser(User user) {
        return usersRepository.save(user);
    }

    @Transactional
    public void removeUser(String username) {
        User byUserName = usersRepository.findByUsername(username);
        if (byUserName != null) {
            usersRepository.delete(byUserName);
        }
    }

    @Transactional
    public void removeUser(Long userId) {
        if (userId != null) {
            usersRepository.deleteById(userId);
        }
    }

    @Transactional(readOnly = true)
    public List<User> findAllUsers() {
        return usersRepository.findAll();
    }

}
