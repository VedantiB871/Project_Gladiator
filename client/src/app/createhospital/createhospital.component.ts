import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-createhospital',
  templateUrl: './createhospital.component.html',
  styleUrls: ['./createhospital.component.scss']
})
export class CreatehospitalComponent implements OnInit {
  itemForm: FormGroup;
  equipmentForm: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  hospitalList: any[] = []; // This variable is used to store the list of hospital information.
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;

  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });

    this.equipmentForm = this.fb.group({
      equipmentName: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getHospital();
  }

  getHospital() {
    this.httpService.getHospital().subscribe(
      (data) => {
        this.hospitalList = data;
      },
      (error) => {
        this.errorMessage = error.message;
        this.showError = true;
      }
    );
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.httpService.createHospital(this.itemForm.value).subscribe(
        (response) => {
          this.responseMessage = response.message;
          this.showMessage = true;
          this.router.navigate(['/hospitals']); // Navigate to the hospital list page after creation
        },
        (error) => {
          this.errorMessage = error.message;
          this.showError = true;
        }
      );
    }
  }

  addEquipment(value: any) {
    if (this.equipmentForm.valid) {
      this.httpService.addEquipment(value.hospitalId, value).subscribe(
        (response) => {
          this.responseMessage = response.message;
          this.showMessage = true;
        },
        (error) => {
          this.errorMessage = error.message;
          this.showError = true;
        }
      );
    }
  }

  submitEquipment() {
    this.addEquipment(this.equipmentForm.value);
  }
}
