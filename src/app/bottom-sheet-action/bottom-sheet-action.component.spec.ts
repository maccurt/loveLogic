import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetActionComponent } from './bottom-sheet-action.component';

describe('BottomSheetActionComponent', () => {
  let component: BottomSheetActionComponent;
  let fixture: ComponentFixture<BottomSheetActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSheetActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSheetActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
