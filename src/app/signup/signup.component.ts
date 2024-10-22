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

  private appService = inject(AppService);
  private router = inject(Router);

  // Method to handle signup form submission
  onSubmit(signupForm: NgForm) {
    // Check if the form is valid
    if (signupForm.valid) {
      // Call the service to handle signup
      this.appService.signup(this.username, this.password, this.email);

      // Inform the user and navigate to the login page
      alert('Signup successful! You can now log in.');
      this.router.navigate(['/login']); // Redirect to login page after successful signup
    } else {
      // Form is invalid, show error alert
      alert('Please fill in all fields correctly.');
    }
  }
}
