import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormsModule, NgForm } from '@angular/forms'; // NgForm added for form validation
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, FooterComponent, HeaderComponent, CommonModule], // Import FormsModule for ngModel
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  email: string = '';

  private router = inject(Router);

  onSubmit(signupForm: NgForm) {
    if (signupForm.valid) {
      alert('Signup successful! You can now log in.');
      this.router.navigate(['/login']);
    } else {
      alert('Please fill in all fields correctly.');
    }
  }
}
