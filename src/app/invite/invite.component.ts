import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Business } from '../business-domain/Business';
import { BusinessComponent } from "../business-domain/business/business.component";
import { BulletPointListComponent } from "../marketing-domain/bullet-point-list/bullet-point-list.component";
import { BusinessStore } from '../business-domain/business.store';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { parseInt } from 'lodash-es';
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
  store = inject(BusinessStore);
  business = input.required<Business>();
  route = inject(ActivatedRoute)

  readonly panelOpenState = signal(false);

  safetyIsExpanded = signal(false);

  ngOnInit(): void {

    //TODO find the best way to destroy this and destroy it everywhere where we subscribe
    this.route.queryParamMap.subscribe((paramMap) => {
      

      const safetyPriority = parseInt(paramMap.get('SafetyPriority') as string);
      if (safetyPriority === 1) {
        this.safetyIsExpanded.set(true);
      }



    })

  }

}
