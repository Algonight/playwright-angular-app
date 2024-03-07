import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  errorMessage?: string;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  resetForm() {
    this.loginForm.reset();
    this.errorMessage = undefined;
  }

  onLogin() {
    this.isLoading = true;
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((isLoggedIn: boolean) => {
        this.isLoading = false;
        this.resetForm();
        if (isLoggedIn) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      });
  }
}
