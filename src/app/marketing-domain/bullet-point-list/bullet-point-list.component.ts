import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Marketing, MarketingBulletpoint, SafetyIsAPriority_MOCK, SocialMedia } from '../Marketing';
import { TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BusinessStore } from '../../business-domain/business.store';

@Component({
  selector: 'll-bullet-point-list',
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    TitleCasePipe],
  templateUrl: './bullet-point-list.component.html',
  styleUrl: './bullet-point-list.component.scss'
})
export class BulletPointListComponent {

  store = inject(BusinessStore);
  marketing = input.required<Marketing>();
  invite = input<boolean>(false);


  goto(){
    
  }


  getBusinessMarketingBulletPoint(): MarketingBulletpoint[] {

    const list: MarketingBulletpoint[] = [];
    const businesss = this.store.businessSelected();

    if (businesss) {

      const fb = this.marketing().bulletPointList.find((b) => {
        return b.socialMedia === SocialMedia.facebook
      })

      if (fb){
        list.push({...fb})
      }

    }

    return list;

  }

}
