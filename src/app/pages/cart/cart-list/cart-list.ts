import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../models/product';
import { CurrencyPipe } from '@angular/common';
import { QuantityUpdate } from '../../../shared/quantity-update/quantity-update';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { CartStore } from '../../../store/cart';

@Component({
  selector: 'app-cart-list',
  imports: [CurrencyPipe, QuantityUpdate, MatIcon, MatIconButton],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.scss',
})
export class CartList {
  product = input.required<Product>();
  quantity = input.required<number>();
  total = computed(() => this.product().price * this.quantity());
  store = inject(CartStore);
}
