import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  hospitalList: any[] = [];
  assignModel: any = {};
  itemForm: FormGroup;
  responseMessage: any;
  showMessage: any;
  maintenanceList: any = [];
  maintenanceObj: any = {};

  constructor(private fb: FormBuilder, private service: HttpService) {
    this.itemForm = this.fb.group({
      status: [this.formModel.status, Validators.required],
      date: ['', [Validators.required, this.dateValidator]],
     
    });
  }

  ngOnInit(): void {
    this.getMaintenance();
    this.getHospitals();
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const datePattern = /^(0[1-9]|1[0-9]|2[0-9]|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/;
    if (!datePattern.test(control.value)) {
      return { invalidDate: true };
    }
    return null;
  }

  getMaintenance(): void {
    this.service.getMaintenance().subscribe(
      (data: any) => {
        this.maintenanceList = data;
      },
      (error: any) => {
        this.showError = true;
        this.errorMessage = error.message;
      }
    );
  }

  getHospitals(): void {
    this.service.getHospital().subscribe(
      (data: any) => {
        this.hospitalList = data;
      },
      (error: any) => {
        this.showError = true;
        this.errorMessage = error.message;
      }
    );
  }

  viewDetails(id: number): void {
    this.maintenanceObj = this.maintenanceList.find((item: { id: number; }) => item.id === id);
    
    this.formModel.status = this.maintenanceObj.status;
    this.itemForm.patchValue(this.formModel);
  }

  edit(id: number): void {
    this.viewDetails(id);
    
  }

  update(): void {
    if (this.itemForm.valid) {
      this.service.updateMaintenance(this.maintenanceObj.id, this.itemForm.value).subscribe(
        (response: any) => {
          this.showMessage = true;
          this.responseMessage = 'Update successful!';
          this.getMaintenance();
        },
        (error: any) => {
          this.showError = true;
          this.errorMessage = error.message;
        }
      );
    }
  }
}
