import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Marketing, MarketingBulletpoint, SafetyMarketing_MOCK, SocialMedia } from '../Marketing';
import { DOCUMENT, TitleCasePipe } from '@angular/common';
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

  phoneNumberSocialMedia = SocialMedia.phoneNumber
  store = inject(BusinessStore);
  document = inject(DOCUMENT);
  marketing = input.required<Marketing>();
  invite = input<boolean>(false);

  getBusinessMarketingBulletPoint(): MarketingBulletpoint[] {
    const list: MarketingBulletpoint[] = [];
    const businesss = this.store.businessSelected();

    if (businesss) {
      const fb = this.marketing().bulletPointList.find((b) => {
        return b.socialMedia === SocialMedia.facebook
      })

      if (fb) {
        list.push({ ...fb })
      }
    }

    return list;

  }

  goToWebsite(b: MarketingBulletpoint) {
    console.log(b);
    if (b.url) {

      const link = this.document.createElement('a');
      if (b.socialMedia === SocialMedia.phoneNumber) {
        console.log('hello');
        link.href = "tel:" + b.url;
      }
      else {
        link.target = '_blank';
        link.href = b.url;
      }

      link.click();
      link.remove();
    }
  }

}