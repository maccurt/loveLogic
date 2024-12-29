import { Component, inject } from '@angular/core';
import { BusinessStore } from '../business-domain/business.store';
import { BusinessDetailComponent } from "../business-domain/business-detail/business-detail.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'll-bottom-sheet-action',
  imports: [BusinessDetailComponent, MatButtonModule, MatIconModule],
  providers: [],
  templateUrl: './bottom-sheet-action.component.html',
  styleUrl: './bottom-sheet-action.component.scss'
})
export class BottomSheetActionComponent {
  public readonly store = inject(BusinessStore);  
}
