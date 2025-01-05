import { Component, inject, OnInit, signal, input } from '@angular/core';
import { BusinessStore } from '../../business-domain/business.store';
import { TitleCasePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CanWeTalkMarketing_Mock, Marketing, MarketingBulletpoint, SafetyIsAPriority_MOCK, WeAreInBeta_Mock } from './Marketing';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { BulletPointListComponent } from "../bullet-point-list/bullet-point-list.component";

@Component({
  selector: 'll-marketing',
  imports: [
    RouterModule,
    TitleCasePipe,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    BulletPointListComponent
  ],
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.scss'
})
export class MarketingComponent implements OnInit {

  ngOnInit(): void {
    this.marketingList().push(
      CanWeTalkMarketing_Mock,
      SafetyIsAPriority_MOCK,
      WeAreInBeta_Mock,
    );
  }

  store = inject(BusinessStore);
  marketingList = signal<Marketing[]>([]);

}