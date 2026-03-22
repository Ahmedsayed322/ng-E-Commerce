import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDialog } from './signup-dialog';

describe('SignupDialog', () => {
  let component: SignupDialog;
  let fixture: ComponentFixture<SignupDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
