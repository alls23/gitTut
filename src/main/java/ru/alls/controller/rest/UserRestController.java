package ru.alls.controller.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.hibernate.collection.internal.PersistentSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.alls.entities.Role;
import ru.alls.entities.UserDataSet;
import ru.alls.userservices.UserServiceImpl;

import javax.servlet.http.HttpServletResponse;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/admin")
public class UserRestController {

    @Autowired
    UserServiceImpl userServiceImpl;

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> returnUserForEdit(@PathVariable("id") long userid, Model model) {
        UserDataSet user = userServiceImpl.getUserById(userid);
        return new ResponseEntity<UserDataSet>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public ResponseEntity editUser(@RequestBody UserDataSet userDataSet) {
        UserDataSet user = userServiceImpl.getUserById(userDataSet.getId());
        if(userDataSet.getPassword() != null) {
            user.setPassword(userDataSet.getPassword());
        }
            Set<Role> roles = userDataSet.getRoles();
            user.setLogin(userDataSet.getLogin());
            user.setName(userDataSet.getName());
            user.setRoles(roles);
        userServiceImpl.saveUser(user);
        System.out.println(userDataSet.getId());

        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity addUser(@RequestBody UserDataSet userDataSet) {
       UserDataSet user = new UserDataSet();
       user.setLogin(userDataSet.getLogin());
       user.setName(userDataSet.getName());
       user.setPassword(userDataSet.getPassword());
       user.setRoles(userDataSet.getRoles());
       userServiceImpl.saveUser(user);
       return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/delet", method = RequestMethod.POST)
    public void deletUser(@RequestBody UserDataSet userDataSet) {

        userServiceImpl.deleteUserById(userDataSet.getId());
    }
}
