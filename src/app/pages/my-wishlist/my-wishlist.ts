import { Component, inject } from '@angular/core';
import { BackButton } from '../../shared/back-button/back-button';
import { ProductCard } from '../../shared/product-card/product-card';
import { ToggleWishlist } from '../../shared/toggle-wishlist/toggle-wishlist';
import { MatAnchor } from '@angular/material/button';
import { EmptyWishlist } from '../../shared/empty-wishlist/empty-wishlist';
import { WishlistStore } from '../../store/wishlist';
import { SeoService } from '../../services/seo-service';
import { productStore } from '../../store/product';

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard, ToggleWishlist, MatAnchor, EmptyWishlist],
  templateUrl: './my-wishlist.html',
  styleUrl: './my-wishlist.scss',
})
export class MyWishlist {
  store = inject(WishlistStore);
  seo = inject(SeoService);
  productStore = inject(productStore);
  constructor() {
    this.seo.updateSeoTags({
      title: 'wishlist | My Store',
      description:
        'View and manage your wishlist items easily. Save your favorite products and keep track of what you love on My Store.',
    });
  }
}
