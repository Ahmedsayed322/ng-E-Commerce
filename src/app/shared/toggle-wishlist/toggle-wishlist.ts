import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../models/product';
import { MatIcon } from '@angular/material/icon';
import { WishlistStore } from '../../store/wishlist';
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-toggle-wishlist',
  imports: [MatIcon, MatButtonModule],
  templateUrl: './toggle-wishlist.html',
  styleUrl: './toggle-wishlist.scss',
})
export class ToggleWishlist {
  product = input.required<Product>();
  store = inject(WishlistStore);
  type = input<string>('product-list');
  isInWhishList = computed(() => this.store.wishlist().find((p) => p.id === this.product().id));
  toggleWishlist() {
    if (this.isInWhishList()) {
      this.store.removeFromWishList(this.product().id);

      return;
    }
    this.store.addToWishList(this.product());
  }
}
