import { Component, inject } from '@angular/core';
import { BusinessStore } from '../business-domain/business.store';
import { BusinessDetailComponent } from "../business-domain/business-detail/business-detail.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { BusinessComponent } from "../business-domain/business/business.component";

@Component({
  selector: 'll-bottom-sheet-action',
  imports: [BusinessDetailComponent, MatButtonModule, MatIconModule, CdkCopyToClipboard, BusinessComponent],
  providers: [],
  templateUrl: './bottom-sheet-action.component.html',
  styleUrl: './bottom-sheet-action.component.scss'
})
export class BottomSheetActionComponent {
  public readonly store = inject(BusinessStore);  
}
