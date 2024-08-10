package com.wecp.medicalequipmentandtrackingsystem.service;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.User;
import com.wecp.medicalequipmentandtrackingsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User createUser(User user){
    String userName=user.getUsername();
    User ifexist=userRepository.findByUserName(userName);
    if(ifexist!=null){
        return null;
    }
    else{
        return userRepository.save(user);
    }
    }
    
}
