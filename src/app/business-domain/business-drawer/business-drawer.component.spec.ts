import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDrawerComponent } from './business-drawer.component';

describe('BusinessDrawerComponent', () => {
  let component: BusinessDrawerComponent;
  let fixture: ComponentFixture<BusinessDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
