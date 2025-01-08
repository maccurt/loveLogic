import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BusinessStore } from '../business-domain/business.store';
import { ActivatedRoute } from '@angular/router';
import { MarketingComponent } from "../marketing-domain/marketing/marketing.component";
import { BulletPointListComponent } from "../marketing-domain/bullet-point-list/bullet-point-list.component";
import { MarketingService } from '../marketing-domain/marketing.service';
import { Marketing } from '../marketing-domain/Marketing';
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
    MarketingComponent,
    BulletPointListComponent,
    InviteComponent
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {

  readonly store = inject(BusinessStore);
  route = inject(ActivatedRoute);
  marketingService = inject(MarketingService);
  showFiller = false;

  marketing = signal<Marketing>(new Marketing());
  businessMarketing = signal<Marketing>(new Marketing());

  showDrawer = true;

  constructor() {
    this.store.loadAllByStateName('NE', 1);
  }

  ngOnInit() {

  }

}
