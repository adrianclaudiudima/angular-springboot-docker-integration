package backend.spring.user.controller;

import backend.spring.user.dto.UserDto;
import backend.spring.user.model.User;
import backend.spring.user.service.UserService;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class UsersController {

    private Mapper dozerMapper;
    private UserService userService;

    @Autowired
    public UsersController(Mapper dozerMapper, UserService userService) {
        this.dozerMapper = dozerMapper;
        this.userService = userService;
    }


    @RequestMapping(path = "/user", method = RequestMethod.POST)
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        User map = dozerMapper.map(userDto, User.class);
        User user = userService.saveUser(map);
        return new ResponseEntity<>(dozerMapper.map(user, UserDto.class), HttpStatus.OK);
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public ResponseEntity<UserDto> getUserByEmail(@RequestParam(required = false, value = "username") String username) {
        User userByUsername = userService.findUserByUsername(username);
        if (userByUsername == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(dozerMapper.map(userByUsername, UserDto.class), HttpStatus.OK);
        }
    }

    @RequestMapping(path = "/users", method = RequestMethod.GET)
    public ResponseEntity<List<UserDto>> getAllUSers() {
        return new ResponseEntity<>(userService.findAllUsers().stream().map(user -> dozerMapper.map(user, UserDto.class)).collect(Collectors.toList()), HttpStatus.OK);
    }

    @RequestMapping(path = "/user", method = RequestMethod.PUT)
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto) {
        User map = dozerMapper.map(userDto, User.class);
        if (map == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        User user = userService.saveUser(map);
        return new ResponseEntity<>(dozerMapper.map(user, UserDto.class), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") String userId) {
        this.userService.removeUser(Long.valueOf(userId));
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
