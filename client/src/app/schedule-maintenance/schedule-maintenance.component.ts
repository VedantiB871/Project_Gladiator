import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-schedule-maintenance',
  templateUrl: './schedule-maintenance.component.html',
  styleUrls: ['./schedule-maintenance.component.scss']
})
export class ScheduleMaintenanceComponent implements OnInit {
  itemForm!: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  hospitalList: any = [];
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;
  equipmentList: any = [];
  hospitalName: any;
  maintenanceSuccess$: any;
  maintenanceError$: any;

  constructor(public router: Router, public httpService: HttpService, private fb: FormBuilder, private service:AuthService){
    this.itemForm = this.fb.group({
      scheduledDate: [this.formModel.scheduledDate, [Validators.required, this.dateValidator]],
      completedDate: [this.formModel.completedDate, [Validators.required, this.dateValidator]],
      description: [this.formModel.description, [Validators.required]],
      status: [this.formModel.status, [Validators.required]],
      equipmentId: [this.formModel.equipmentId, [Validators.required]],
      hospitalId: [this.formModel.hospitalId, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getHospital();
  }

  dateValidator(control: AbstractControl): ValidationErrors | null{
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if(!datePattern.test(control.value)){
      return {invalidDate: true}
    }
    return null;
  }

  getHospital(){
    if (!this.hospitalName) {
      // this.showError = true;
      // this.errorMessage = 'Please enter a hospital name.';
      return;
    }

    this.httpService.getHospital().subscribe(
      (hospital: any) => {
        if (hospital) {
          this.assignModel.hospital = hospital;
          console.log('Selected Hospital:', hospital);
        } else {
          this.showError = true;
          this.errorMessage = 'Selected hospital not found.';
        }
      },
      (error) => {
        this.showError = true;
        this.errorMessage = 'Unable to fetch hospital details.';
      }
    );
  }

  onSubmit(){
    
    if(this.itemForm.invalid){
      return;
    }
    else
    {
      const formData= this.itemForm.value;
      console.log(formData);
      const maintenanceId = formData.id;
      this.httpService.scheduleMaintenance(maintenanceId,formData).subscribe(
        (res: any) => {
          this.maintenanceSuccess$ = of("Data added created successfully!");
        },
        (error) => {
          this.maintenanceError$ = of("Unable to add data!");
        }
      );
      }
  }

  onHospitalSelect() {
    this.httpService.getHospital().subscribe(
      (hospital: any) => {
        if (hospital) {
          this.assignModel.hospital = hospital;
          console.log('Selected Hospital:', hospital);
        } else {
          this.showError = true;
          this.errorMessage = 'Selected hospital not found.';
        }
      },
      (error) => {
        this.showError = true;
        this.errorMessage = 'Unable to fetch hospital details.';
      }
    );
  }

  
}








