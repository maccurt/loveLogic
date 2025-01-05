import { Component, inject, input, signal } from '@angular/core';
import { Business } from '../business-domain/Business';
import { BusinessComponent } from "../business-domain/business/business.component";
import { BulletPointListComponent } from "../marketing-domain/bullet-point-list/bullet-point-list.component";
import { BusinessStore } from '../business-domain/business.store';

@Component({
  selector: 'll-invite',
  imports: [BusinessComponent, BulletPointListComponent],
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.scss'
})
export class InviteComponent {

  store = inject(BusinessStore)
  business = input.required<Business>();

}
