import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-payment-opt',
  imports: [MatIcon, MatRadioModule],
  templateUrl: './payment-opt.html',
  styleUrl: './payment-opt.scss',
})
export class PaymentOpt {}
