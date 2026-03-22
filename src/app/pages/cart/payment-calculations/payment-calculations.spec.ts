import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCalculations } from './payment-calculations';

describe('PaymentCalculations', () => {
  let component: PaymentCalculations;
  let fixture: ComponentFixture<PaymentCalculations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCalculations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCalculations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
