import { Component, inject } from '@angular/core';
import { BusinessStore } from '../business-domain/business.store';
import { BusinessComponent } from "../business-domain/business/business.component";
import { BusinessDrawerComponent } from "../business-domain/business-drawer/business-drawer.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'll-bottom-sheet-action',
  imports: [BusinessDrawerComponent, MatButtonModule],
  providers: [],
  templateUrl: './bottom-sheet-action.component.html',
  styleUrl: './bottom-sheet-action.component.scss'
})
export class BottomSheetActionComponent {

  public readonly store = inject(BusinessStore);

  constructor() {

    
  }

}
