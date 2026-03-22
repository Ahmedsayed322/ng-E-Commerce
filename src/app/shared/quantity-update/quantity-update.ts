import { Component, input, output } from '@angular/core';
import {  MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-quantity-update',
  imports: [MatIcon, MatIconButton],
  templateUrl: './quantity-update.html',
  styleUrl: './quantity-update.scss',
})
export class QuantityUpdate {
  quantity = input<number>(0);
  quantityChange = output<number>();
}
