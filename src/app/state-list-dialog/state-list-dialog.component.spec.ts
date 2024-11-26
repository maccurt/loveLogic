import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateListDialogComponent } from './state-list-dialog.component';

describe('StateListDialogComponent', () => {
  let component: StateListDialogComponent;
  let fixture: ComponentFixture<StateListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateListDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
