import { Component, inject } from '@angular/core';
import { BusinessStore } from '../business-domain/business.store';

@Component({
  selector: 'll-marketing',
  imports: [],
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.scss'
})
export class MarketingComponent {

  store = inject(BusinessStore);

}
