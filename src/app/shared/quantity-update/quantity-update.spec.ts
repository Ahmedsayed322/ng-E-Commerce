import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityUpdate } from './quantity-update';

describe('QuantityUpdate', () => {
  let component: QuantityUpdate;
  let fixture: ComponentFixture<QuantityUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantityUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
