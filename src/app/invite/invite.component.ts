import { Component, inject, input, signal } from '@angular/core';
import { Business } from '../business-domain/Business';
import { BusinessComponent } from "../business-domain/business/business.component";
import { BulletPointListComponent } from "../marketing-domain/bullet-point-list/bullet-point-list.component";
import { BusinessStore } from '../business-domain/business.store';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { parseInt } from 'lodash-es';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MarketingStore } from '../marketing-domain/marketing.store';
@Component({
  selector: 'll-invite',
  imports: [
    BusinessComponent,
    BulletPointListComponent,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.scss'
})
export class InviteComponent  {
  readonly store = inject(BusinessStore);
  readonly marketingStore = inject(MarketingStore);
  readonly route = inject(ActivatedRoute);
  readonly fb = inject(FormBuilder);
  //input
  readonly business = input.required<Business>();
  readonly createMode = input<boolean>(true);
  //misc
  readonly panelOpenState = signal(false);
  readonly safetyIsExpanded = signal(false);
  readonly form = this.fb.group(({}));

  constructor() {

    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((paramMap) => {
      //TODO add all take until destroyed on all subscribes in code
      const safetyPriority = parseInt(paramMap.get('SafetyPriority') as string);
      if (safetyPriority === 1) {
        this.safetyIsExpanded.set(true);
      }
    });
  }
}
