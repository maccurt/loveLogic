import { Component, inject } from '@angular/core';
import { MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { BusinessStore } from '../business-domain/business.store';

@Component({
  selector: 'll-state-list-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './state-list-dialog.component.html',
  styleUrl: './state-list-dialog.component.scss'
})
export class StateListDialogComponent {

  store = inject(BusinessStore);

}
