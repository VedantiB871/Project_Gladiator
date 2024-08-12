import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  itemForm!: FormGroup;
  formModel: any = {};
  showError: boolean = false;
  errorMessage: any;

  constructor(private fb: FormBuilder, private service: HttpService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      username: [this.formModel.username, [Validators.required]],
      password: [this.formModel.password, [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    if (this.itemForm.valid) {
      this.service.Login(this.itemForm.value).subscribe(
        (response: any) => {
          
            localStorage.setItem("token", response.token);
            localStorage.setItem("role",response.role);
            localStorage.setItem("user_id",response.username);
            localStorage.setItem("user_id",response.email);
          // Handle successful login
          this.router.navigate(['/dashboard']); // Navigate to dashboard or another route
        },
        (error: any) => {
          this.showError = true;
          this.errorMessage = `Login failed: ${error.message}`;
        }
      );
    }
  }

  

  registration(): void {
    this.router.navigate(['/registration']); // Navigate to registration page
  }
}
