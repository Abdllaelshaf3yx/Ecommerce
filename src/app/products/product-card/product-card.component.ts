// src/app/products/product-card/product-card.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../cart/cart.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: `./product-card.component.html`,
  styleUrls: ['./product-card.component.css'],
  imports: [CurrencyPipe],
})
export class ProductCardComponent {
  @Input() product!: CartItem;
  @Output() addToCart = new EventEmitter<CartItem>();
}
