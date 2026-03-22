import { Component, effect, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-shipping-form',
  imports: [MatFormField, MatLabel, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatIcon],
  templateUrl: './shipping-form.html',
  styleUrl: './shipping-form.scss',
})
export class ShippingForm {
  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
  });
  shippingForm = output<any>();
  constructor() {
    effect(() => {
      this.form.valueChanges.subscribe((value) => {
        if (this.form.valid) {
          this.shippingForm.emit(value);
        }
      });
    });
  }
}
