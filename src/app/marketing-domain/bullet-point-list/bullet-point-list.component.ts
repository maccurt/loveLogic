import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MarketingBulletpoint, SocialMedia } from '../Marketing';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BusinessStore } from '../../business-domain/business.store';
import { Business } from '../../business-domain/Business';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskPipe } from 'ngx-mask';
import { WebsitePipe } from '../../website.pipe';
@Component({
  selector: 'll-bullet-point-list',
  imports: [
    CommonModule,
    ClipboardModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    NgxMaskPipe,
    WebsitePipe
  ],
  templateUrl: './bullet-point-list.component.html',
  styleUrl: './bullet-point-list.component.scss'
})
export class BulletPointListComponent {

  phoneNumberSocialMedia = SocialMedia.phoneNumber;
  store = inject(BusinessStore);
  document = inject(DOCUMENT);
  private readonly clipboard = inject(Clipboard);
  private _snackBar = inject(MatSnackBar);
  bulletPointList = input.required<MarketingBulletpoint[]>();
  showSubtitle = input<boolean>(false);
  isInvite = input<boolean>(false);

  copyInvite(business: Business) {
    this.clipboard.copy(business.urlInvite.value);
    this._snackBar.open('invitation copied to clipboard', 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  goToWebsite(b: MarketingBulletpoint) {
    if (b.url) {
      const link = this.document.createElement('a');
      if (b.socialMedia === SocialMedia.phoneNumber) {
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
