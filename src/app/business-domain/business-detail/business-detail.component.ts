import { Component, inject } from '@angular/core';
import { BusinessStore } from '../business.store';
import { BusinessComponent } from "../business/business.component";
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { safetyBulletpointList_Mock } from '../categroryListMock';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { IconTextHintComponent } from "../../icon-text-hint/icon-text-hint.component";
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'll-business-detail',
  imports: [BusinessComponent,
    ClipboardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    IconTextHintComponent],
  templateUrl: './business-detail.component.html',
  styleUrl: './business-detail.component.scss'
})
export class BusinessDetailComponent {
  public safetyBulletPointList = safetyBulletpointList_Mock;
  public readonly store = inject(BusinessStore);  
}
