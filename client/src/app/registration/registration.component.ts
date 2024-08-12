import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = { role: null, email: '', password: '', username: '' };
  showMessage: boolean = false;
  responseMessage: any;
  roles: string[] = ['HOSPITAL', 'TECHNICIAN', 'SUPPLIER']; // Example roles

  constructor(private fb: FormBuilder, private service: HttpService) {
    this.itemForm = this.fb.group({
      role: [this.formModel.role, Validators.required],
      email: [this.formModel.email, [Validators.required, Validators.email]],
      password: [this.formModel.password, [Validators.required, Validators.minLength(6)]],
      username: [this.formModel.username, Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  onRegister(): void {
    if (this.itemForm.valid) {
      this.service.registerUser(this.itemForm.value).subscribe(
        (response: any) => {
          this.showMessage = true;
          this.responseMessage = 'Registration successful!';
        },
        (error: any) => {
          this.showMessage = true;
          this.responseMessage = `Registration failed: ${error.message}`;
        }
      );
    }
  }
}
