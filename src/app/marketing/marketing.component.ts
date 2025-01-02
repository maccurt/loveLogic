import { Component, inject } from '@angular/core';
import { BusinessStore } from '../business-domain/business.store';
import { TitleCasePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'll-marketing',
  imports: [
    TitleCasePipe,
    MatListModule,
    MatIconModule,
    MatExpansionModule],
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.scss'
})
export class MarketingComponent {

  store = inject(BusinessStore);

}
