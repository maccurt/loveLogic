import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BusinessComponent } from "../business/business.component";
import { BusinessStore } from '../business.store';

@Component({
  selector: 'll-business-dialog',
  imports: [
    MatDialogModule, BusinessComponent],
  templateUrl: './business-dialog.component.html',
  styleUrl: './business-dialog.component.scss'
})
export class BusinessDialogComponent {
  store = inject(BusinessStore);

}
