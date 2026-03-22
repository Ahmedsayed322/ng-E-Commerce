import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleWishlist } from './toggle-wishlist';

describe('ToggleWishlist', () => {
  let component: ToggleWishlist;
  let fixture: ComponentFixture<ToggleWishlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleWishlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleWishlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
