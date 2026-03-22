import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOpt } from './payment-opt';

describe('PaymentOpt', () => {
  let component: PaymentOpt;
  let fixture: ComponentFixture<PaymentOpt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentOpt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentOpt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
