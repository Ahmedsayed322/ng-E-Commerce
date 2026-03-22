import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/product';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { QuantityUpdate } from '../../../shared/quantity-update/quantity-update';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CartStore } from '../../../store/cart';
import { ToggleWishlist } from "../../../shared/toggle-wishlist/toggle-wishlist";
import { Rating } from "../../../shared/rating/rating";

@Component({
  selector: 'app-product-info',
  imports: [TitleCasePipe, CurrencyPipe, QuantityUpdate, MatAnchor, MatIcon, MatIconButton, ToggleWishlist, Rating],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss',
})
export class ProductInfo {
  product = input.required<Product | null>();
  cartStore = inject(CartStore);
  quantity = signal<number>(1);
}
