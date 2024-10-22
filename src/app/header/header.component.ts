import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private cartService = inject(AppService);

  cartItems = this.cartService.cart().length;
  username = this.cartService.currentUser();

  constructor() {
    effect(() => {
      this.cartItems = this.cartService.cart().length;
      this.username = this.cartService.currentUser();
    });
  }

  logout() {
    this.cartService.logout();
  }
}
