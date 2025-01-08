import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BusinessStore } from '../business-domain/business.store';
import { MarketingService } from '../marketing-domain/marketing.service';
import { InviteComponent } from "../invite/invite.component";

@Component({
  selector: 'll-test',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    MatSidenavModule,
    ClipboardModule,
    InviteComponent
],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent  {

  readonly store = inject(BusinessStore);
  marketingService = inject(MarketingService);

  constructor() {
    this.store.loadAllByStateName('NE', 1);
  }
}
