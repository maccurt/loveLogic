import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BusinessStore } from '../business-domain/business.store';
import { StateLocation } from '../business-domain/Business';
import { BusinessService } from '../business-domain/business.service';
import { RouterModule } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';

@Component({
    selector: 'll-location-list',
    imports: [MatCardModule, RouterModule, MatChipsModule],
    templateUrl: './location-list.component.html',
    styleUrl: './location-list.component.scss'
})
export class LocationListComponent implements OnInit {
  store = inject(BusinessStore);
  businessService = inject(BusinessService);
  public locationList:StateLocation[] = [];

  ngOnInit(): void {
    this.businessService.locationList().subscribe((result)=>{
      this.locationList = result;
    });
  }
}