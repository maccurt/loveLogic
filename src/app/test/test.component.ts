import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BusinessStore } from '../business-domain/business.store';
import { BusinessComponent } from "../business-domain/business/business.component";
import { ActivatedRoute } from '@angular/router';
import { MarketingComponent } from "../marketing-domain/marketing/marketing.component";

@Component({
  selector: 'll-test',
   imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    MatSidenavModule,
    ClipboardModule,
    MarketingComponent
],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {

  store = inject(BusinessStore);
  route = inject(ActivatedRoute);
  showFiller = false;

  showDrawer = true;

  constructor() {

    this.store.loadAllByStateName('NE',1);

  }
  ngOnInit(): void {

    this.route.queryParamMap.subscribe((parm)=>{

      const show = parm.get('showDrawer');

      if (show){
        this.showDrawer = true;
      }
      else{
        this.showDrawer= false;
      }

    });

  }

}
