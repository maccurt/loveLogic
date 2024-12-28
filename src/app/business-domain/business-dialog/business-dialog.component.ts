import { Component, inject } from '@angular/core';
import { BusinessDetailComponent } from "../business-detail/business-detail.component";
import { MatDialogModule } from '@angular/material/dialog';
import { BusinessComponent } from "../business/business.component";
import { BusinessStore } from '../business.store';
import { IconTextHintComponent } from "../../icon-text-hint/icon-text-hint.component";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'll-business-dialog',
  imports: [BusinessDetailComponent,
    MatDialogModule, BusinessComponent, IconTextHintComponent],
  templateUrl: './business-dialog.component.html',
  styleUrl: './business-dialog.component.scss'
})
export class BusinessDialogComponent {
  store = inject(BusinessStore)

}
