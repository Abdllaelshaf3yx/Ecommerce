import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, HeaderComponent, FooterComponent, CommonModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  private appService = inject(AppService);
  private router = inject(Router);

  login() {
    if (this.username && this.password) {
      this.appService.login(this.username);
      this.router.navigate(['/']);
    } else {
      alert('Please enter valid credentials.');
    }
  }
}
