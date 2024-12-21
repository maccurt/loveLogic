import { Component, inject } from '@angular/core';
import { BusinessStore } from '../business.store';
import { BusinessComponent } from "../business/business.component";
import { SafetyComponent } from "../../safety/safety.component";
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { safetyBulletpointList_Mock } from '../categroryListMock';
import { MatButtonModule } from '@angular/material/button';


import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'll-business-drawer',
  imports: [BusinessComponent,
    SafetyComponent,
    ClipboardModule,
    MatIconModule,
    MatButtonModule,
    ScrollingModule],
  templateUrl: './business-drawer.component.html',
  styleUrl: './business-drawer.component.scss'
})
export class BusinessDrawerComponent  {

  public safetyBulletPointList = safetyBulletpointList_Mock;
  public readonly store = inject(BusinessStore);

  //TODO remove this and use the store
  hideBusiness() {
    this.store.showBusinessToggle(false);
  }

}
