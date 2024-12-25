import { Component, inject, input } from '@angular/core';
import { Business } from '../Business';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskPipe } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { BusinessStore } from '../business.store';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { MatChipsModule } from '@angular/material/chips';
import { AddressComponent } from "../../address/address.component";
@Component({
  selector: 'll-business',
  imports: [
    MatCardModule,
    NgxMaskPipe,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    AddressComponent
],
  templateUrl: './business.component.html',
  styleUrl: './business.component.scss'
})
export class BusinessComponent {
  business = input.required<Business>();
  compactMode = input<boolean>();
  detailMode = input<boolean>(false);
  public readonly store = inject(BusinessStore);
}