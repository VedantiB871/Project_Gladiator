package com.wecp.medicalequipmentandtrackingsystem.repository;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    public User findByUserName(String name);
    // extend jpa repository and add custom methods if needed
}

