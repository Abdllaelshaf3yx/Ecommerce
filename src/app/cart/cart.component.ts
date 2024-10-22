import { Component, effect, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AppService } from '../app.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartItem } from './cart.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent, FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private cartService = inject(AppService);
  cartItems: CartItem[] = this.cartService.getCartItems();

  constructor() {
    effect(() => {
      this.cartItems = this.cartService.getCartItems();
    });
  }

  updateQuantity(item: CartItem) {
    this.cartService.updateItemQuantity(item);
  }

  removeItem(item: CartItem) {
    this.cartService.removeItemFromCart(item);
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  // Method to handle checkout
  checkout() {
    alert('Proceeding to checkout with total: $' + this.getTotalPrice());
  }
}
