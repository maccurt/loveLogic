import { Component, effect, inject, input, signal } from '@angular/core';
import { Business } from '../business-domain/Business';
import { BusinessComponent } from "../business-domain/business/business.component";
import { BulletPointListComponent } from "../marketing-domain/bullet-point-list/bullet-point-list.component";
// import { BusinessStore } from '../business-domain/business.store';
import { MatExpansionModule } from '@angular/material/expansion';
import { MarketingStore } from '../marketing-domain/marketing.store';
@Component({
  selector: 'll-invite',
  imports: [
    BusinessComponent,
    BulletPointListComponent,
    MatExpansionModule
  ],
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.scss'
})
export class InviteComponent {
  
  business = input.required<Business>();  
  marketingStore = inject(MarketingStore);
  readonly panelOpenState = signal(false);
  
  constructor() {
    effect(() => {
      this.marketingStore.setBusinessMarketing(this.business())
    })
  }
}
