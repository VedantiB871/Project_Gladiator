package com.wecp.medicalequipmentandtrackingsystem.service;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
import com.wecp.medicalequipmentandtrackingsystem.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class EquipmentService {
    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private HospitalRepository hospitalRepository;

    public Equipment addEquipment(Long hospitalId, Equipment equipment) {
        Hospital hospital = hospitalRepository.findById(hospitalId)
        .orElseThrow(()-> new EntityNotFoundException(""));
        equipment.setHospital(hospital);
        return equipmentRepository.save(equipment);
    }

    public List<Equipment> getAllEquipments() {
        return equipmentRepository.findAll();
    }



    public List<Equipment> getAllEquipmentsOfHospital(Long hospitalId) {
        Hospital hospital = hospitalRepository.findById(hospitalId).get();
        return hospital.getEquipmentList();
    }
    
    
}


// package com.wecp.medicalequipmentandtrackingsystem.service;

// import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
// import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
// import com.wecp.medicalequipmentandtrackingsystem.repository.EquipmentRepository;
// import com.wecp.medicalequipmentandtrackingsystem.repository.HospitalRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class EquipmentService {

   
// }
//     public Equipment getEquipmentById(Long id) {
//         return equipmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Equipment not found"));
//     }

//     public Equipment updateEquipment(Long id, Equipment equipmentDetails) {
//         Equipment equipment = equipmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Equipment not found"));
//         equipment.setName(equipmentDetails.getName());
//         equipment.setDescription(equipmentDetails.getDescription());
//         equipment.setHospital(equipmentDetails.getHospital());
//         return equipmentRepository.save(equipment);
//     }

//     public void deleteEquipment(Long id) {
//         Equipment equipment = equipmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Equipment not found"));
//         equipmentRepository.delete(equipment);
//     }
// }

