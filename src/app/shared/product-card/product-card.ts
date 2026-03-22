import { Component, inject, input } from '@angular/core';

import { CurrencyPipe } from '@angular/common';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Product } from '../../models/product';
import { DescriptionPipe } from '../../pipes/description-pipe';
import { productStore } from '../../store/product';
import { CartStore } from '../../store/cart';
import { RouterLink } from '@angular/router';
import { Rating } from "../rating/rating";

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, MatAnchor, MatIcon, DescriptionPipe, RouterLink, Rating],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();
  productStore = inject(productStore);
  cartStore = inject(CartStore);
  addToCart() {
    this.cartStore.addToCart({ product: this.product(), quantity: 1 });
  }
}
