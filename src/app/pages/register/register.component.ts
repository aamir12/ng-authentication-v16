import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    name: ['',[Validators.required]],
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
    const {email,password,name } = this.form.getRawValue();
    this.authService.register(email,password,name).subscribe({
      next : (res)=> {
        this.router.navigate(['/dashboard'])
      },
      error: (error) => {
        this.error = error;

      }
    });
  }


  
}


