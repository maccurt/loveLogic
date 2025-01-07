import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Business } from '../business-domain/Business';
import { BusinessComponent } from "../business-domain/business/business.component";
import { BulletPointListComponent } from "../marketing-domain/bullet-point-list/bullet-point-list.component";
import { BusinessStore } from '../business-domain/business.store';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { parseInt } from 'lodash-es';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class InviteComponent implements OnInit {
  readonly store = inject(BusinessStore);
  readonly route = inject(ActivatedRoute);

  readonly business = input.required<Business>();
  readonly panelOpenState = signal(false);
  readonly safetyIsExpanded = signal(false);

  ngOnInit(): void {
    
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((paramMap) => {
      //TODO add all take until destroyed on all subscribes in code
      const safetyPriority = parseInt(paramMap.get('SafetyPriority') as string);
      if (safetyPriority === 1) {
        this.safetyIsExpanded.set(true);
      }

    });
  }
}
