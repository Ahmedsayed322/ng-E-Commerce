import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderIcons } from './header-icons';

describe('HeaderIcons', () => {
  let component: HeaderIcons;
  let fixture: ComponentFixture<HeaderIcons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderIcons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderIcons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
