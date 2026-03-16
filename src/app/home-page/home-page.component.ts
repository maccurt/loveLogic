import { Component, inject, OnInit } from '@angular/core';
import { BusinessStore } from '../business-domain/business.store';
import { BusinessComponent } from '../business-domain/business/business.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderFilterComponent } from "../header-filter/header-filter.component";

import { MarketingComponent } from '../marketing-domain/marketing/marketing.component';
import { MarketingService } from '../marketing-domain/marketing.service';
import { InviteComponent } from "../invite/invite.component";

@Component({
  selector: 'll-home-page',
  imports: [    
    BusinessComponent,    
    MatSidenavModule,
    HeaderFilterComponent,
    MarketingComponent,
    InviteComponent
  ],
  providers: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent  {
  readonly marketingService = inject(MarketingService);
  readonly store = inject(BusinessStore);  
}