import { Component, inject } from '@angular/core';
import { BusinessStore } from '../business-domain/business.store';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'll-marketing',
  imports: [TitleCasePipe ],
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.scss'
})
export class MarketingComponent {

  store = inject(BusinessStore);

}
