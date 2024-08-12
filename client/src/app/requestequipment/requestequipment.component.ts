import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-requestequipment',
  templateUrl: './requestequipment.component.html',
  styleUrls: ['./requestequipment.component.scss']
})
export class RequestequipmentComponent implements OnInit
{

  itemModel:any={status:null};
   showError:boolean=false; 
   errorMessage:any;
    hospitalList:any=[]; 
    equipmentList: any[] = ['Equipment X', 'Equipment Y', 'Equipment Z'];
    assignModel: any={}; 
    itemForm!: FormGroup; 
    showMessage: any;
     responseMessage: any; 
     maintenanceList: any=[]; 
    maintenanceObj: any={}; 
    constructor(private fb: FormBuilder,private hospitalService:HttpService) {
      this.itemForm = this.fb.group({
        status: [null, Validators.required],
        name: ['', Validators.required],
        date: [null, Validators.required,this.dateValidator],
        hospital: ['', Validators.required],
        quantity: [null, [Validators.required, Validators.min(1)]],
        equipment: ['', Validators.required],
      });
    }
  
    ngOnInit(): void {
      this.getHospital();
    }
  
    getHospital(): void {
      // Logic to fetch hospital list if needed
      this.hospitalService.getHospital().subscribe(
        (        data: any) => {
          this.hospitalList = data; // Assuming `data` is an array of hospitals
          if (this.hospitalList.length > 0) {
            this.onHospitalSelect(this.hospitalList[0]); // Select the first hospital by default
          }
        },
        (        error: any) => {
          console.error('Error fetching hospital details:', error);
        }
      )

    }
  
    dateValidator(control:AbstractControl):ValidationErrors | null {
      // Custom date validation logic if needed
      const datePattern=/^\d{4}-\d{2}-\d{2}$/;
      if(!datePattern.test(control.value))
      {
        return{invalidDAte:true}
      }
      return null;
    }
  
    onSubmit(): void {
      if (this.itemForm.valid) {
        const hospitalId = this.itemForm.get('hospital')?.value;
        const equipment = {
          status: this.itemForm.get('status')?.value,
          name: this.itemForm.get('name')?.value,
          date: this.itemForm.get('date')?.value,
          quantity: this.itemForm.get('quantity')?.value,
          equipment: this.itemForm.get('equipment')?.value,
        };
  
        this.hospitalService.addEquipment(hospitalId, equipment).subscribe(
          (response: any) => {
            this.showMessage = true;
            this.responseMessage = 'Equipment added successfully!';
          },
          (error: any) => {
            this.showError = true;
            this.errorMessage = 'Error adding equipment: ' + error.message;
          }
        );
      } else {
        this.showError = true;
        this.errorMessage = 'Please fill out all required fields.';
      }
    }
  
    onHospitalSelect(hospitalList:any): void {
      // Logic to handle hospital selection if needed
      this.assignModel = this.hospitalList; // Update the selected hospital
      this.itemForm.patchValue({
        name: this.hospitalList.name,
        address: this.hospitalList.address,
        date: this.hospitalList.date
      });
    }
  }
  
  
  

//todo: complete missing code..

