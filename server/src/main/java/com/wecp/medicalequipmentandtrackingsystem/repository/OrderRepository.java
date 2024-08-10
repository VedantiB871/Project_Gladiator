package com.wecp.medicalequipmentandtrackingsystem.repository;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{
//List<Accounts> getAccountsByCustomerCustomerId(int customerId);
    // extend jpa repository and add method if needed
}
