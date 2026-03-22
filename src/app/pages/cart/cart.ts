import { Component, inject } from '@angular/core';
import { BackButton } from '../../shared/back-button/back-button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { Panel } from '../../directives/panel';
import { CartList } from './cart-list/cart-list';
import { PaymentCalculations } from './payment-calculations/payment-calculations';
import { CartStore } from '../../store/cart';
import { WishlistStore } from '../../store/wishlist';
import { SeoService } from '../../services/seo-service';

@Component({
  selector: 'app-cart',
  imports: [BackButton, MatIcon, RouterLink, MatButton, Panel, CartList, PaymentCalculations],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cartStore = inject(CartStore);
  wishlistStore = inject(WishlistStore);
  seo = inject(SeoService);

  constructor() {
    this.seo.updateSeoTags({
      title: 'cart | My Store',
      description:
        'Review the items in your cart, update quantities, and get ready to proceed to checkout on My Store.',
    });
  }
}
