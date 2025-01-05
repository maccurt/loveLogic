import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletPointListComponent } from './bullet-point-list.component';

describe('BulletPointListComponent', () => {
  let component: BulletPointListComponent;
  let fixture: ComponentFixture<BulletPointListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulletPointListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulletPointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
