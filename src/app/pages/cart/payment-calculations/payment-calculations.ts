import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Panel } from '../../../directives/panel';
import { CartStore } from '../../../store/cart';

@Component({
  selector: 'app-payment-calculations',
  imports: [CurrencyPipe, Panel],
  templateUrl: './payment-calculations.html',
  styleUrl: './payment-calculations.scss',
})
export class PaymentCalculations {
  store = inject(CartStore);
}
