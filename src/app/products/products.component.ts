import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AppService } from '../app.service';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../cart/cart.model';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HeaderComponent, CurrencyPipe, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products = signal<CartItem[]>([]); // Signal to hold products array

  // Inject the AppService
  private productsService = inject(AppService);

  ngOnInit(): void {
    // Load the products from the service
    this.productsService.loadProducts().subscribe({
      next: (products) => {
        this.products.set(products as CartItem[]); // Ensure the products are of type CartItem
      },
      error: (err) => {
        console.error('Failed to load products', err);
      },
    });
  }

  // Add a product to the cart
  addToCart(product: CartItem) {
    if (this.productsService.isLoggedIn()) {
      this.productsService.addItemToCart(product); // Add the product to the cart via the service
      console.log(this.productsService.getCartItems()); // Log the updated cart
    } else {
      alert('Please log in to add items to the cart.');
    }
  }
}
