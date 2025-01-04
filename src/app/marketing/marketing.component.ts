import { Component, inject, signal } from '@angular/core';
import { BusinessStore } from '../business-domain/business.store';
import { TitleCasePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CanWeTalkMarketing_Mock, Marketing, MarketingBulletpoint, SafetyIsAPriority_MOCK, WeAreInBeta_Mock } from './Marketing';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'll-marketing',
  imports: [
    TitleCasePipe,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule],
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.scss'
})
export class MarketingComponent {

  store = inject(BusinessStore);
  marketingList = signal<Marketing[]>([
    CanWeTalkMarketing_Mock,
    SafetyIsAPriority_MOCK,
    WeAreInBeta_Mock,
  ]);

}