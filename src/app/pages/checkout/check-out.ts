import { Component, inject } from '@angular/core';
import { BackButton } from '../../shared/back-button/back-button';
import { PaymentCalculations } from '../cart/payment-calculations/payment-calculations';
import { MatAnchor } from '@angular/material/button';

import { Panel } from '../../directives/panel';
import { ShippingForm } from './shipping-form/shipping-form';
import { PaymentOpt } from './payment-opt/payment-opt';
import { CartStore } from '../../store/cart';
import { CurrencyPipe } from '@angular/common';
import { SeoService } from '../../services/seo-service';

@Component({
  selector: 'app-check-out',
  imports: [
    BackButton,
    PaymentCalculations,
    MatAnchor,
    Panel,
    ShippingForm,
    PaymentOpt,
    CurrencyPipe,
  ],
  templateUrl: './check-out.html',
  styleUrl: './check-out.scss',
})
export class CheckOut {
  cartStore = inject(CartStore);
  seo = inject(SeoService);
  getShippingData(data: any) {
    console.log(data);
  }
  constructor() {
    this.seo.updateSeoTags({
      title: 'checkout | My Store',
      description:
        "You're one step away from your order! Confirm your details and enjoy a smooth, secure checkout with My Store.",
    });
  }
}
