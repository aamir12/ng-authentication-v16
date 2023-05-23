import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6)]]
  })

  error = ''
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router: Router) {}

  onSubmit() {
    this.error = '';
    const {email,password} = this.form.getRawValue();
    this.authService.login(email,password).subscribe({
        next: (res) => {
          this.router.navigate(['/dashboard'])
        },
        error: (error) => {
          this.error = error;
        }
    });
  }
  
  
}
