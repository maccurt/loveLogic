import { Component, inject, input } from '@angular/core';
import { Business } from '../Business';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BusinessStore } from '../business.store';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { MatChipsModule } from '@angular/material/chips';
import { AddressComponent } from "../../address/address.component";
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'll-business',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    AddressComponent,
    ClipboardModule
  ],
  templateUrl: './business.component.html',
  styleUrl: './business.component.scss'
})
export class BusinessComponent {
  business = input.required<Business>();
  compactMode = input<boolean>();
  detailMode = input<boolean>(false);
  private readonly clipboard = inject(Clipboard);
  private _snackBar = inject(MatSnackBar);
  public readonly store = inject(BusinessStore);

  copyInvite() {
    this.clipboard.copy(this.business().urlInvite.value);

    this._snackBar.open('invitation copied to clipboard', 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}