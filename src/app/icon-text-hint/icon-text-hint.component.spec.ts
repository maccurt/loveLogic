import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTextHintComponent } from './icon-text-hint.component';

describe('IconTextHintComponent', () => {
  let component: IconTextHintComponent;
  let fixture: ComponentFixture<IconTextHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconTextHintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconTextHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
