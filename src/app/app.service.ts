import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart/cart.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  cart = signal<CartItem[]>([]);
  isLoggedIn = signal<boolean>(false);
  currentUser = signal<string | null>(null);

  private httpClient = inject(HttpClient);

  loadProducts() {
    return this.httpClient.get('http://localhost:3000/products');
  }

  login(username: string) {
    this.isLoggedIn.set(true);
    this.currentUser.set(username);
  }

  // Method to logout
  logout() {
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.cart.set([]);
  }

  // Method to signup
  signup(username: string, password: string, email: string) {
    console.log('User signed up:', { username, password, email });
  }

  getCartItems() {
    return this.cart();
  }

  addItemToCart(item: CartItem) {
    if (!this.isLoggedIn()) {
      alert('Please log in to add items to the cart.');
      return;
    }

    if (!item.quantity) {
      item.quantity = 1;
    }

    this.cart.update((cart) => [...cart, item]);
  }

  updateItemQuantity(item: CartItem) {
    if (!this.isLoggedIn()) {
      alert('Please log in to update items in the cart.');
      return;
    }

    this.cart.update((cart) =>
      cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: item.quantity }
          : cartItem
      )
    );
  }

  removeItemFromCart(item: CartItem) {
    if (!this.isLoggedIn()) {
      alert('Please log in to remove items from the cart.');
      return;
    }

    this.cart.update((cart) =>
      cart.filter((cartItem) => cartItem.id !== item.id)
    );
  }

  getTotalPrice(): number {
    return this.cart().reduce(
      (total, item) => total + item.price * (item.quantity || 0),
      0
    );
  }
}
