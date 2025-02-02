import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BusinessStore } from '../business-domain/business.store';
import { MarketingService } from '../marketing-domain/marketing.service';
import { IncomeStatementComponent } from '../../../projects/pdl-profit-calculator/src/public-api';

export class Exercise {
  name!: string;
  set!:number
  rep!:number
  hint?:string
}

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
    IncomeStatementComponent
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  exerciseList: Exercise[] = [
    {name:'Dumbell',set:4,rep:50, hint:'do not lift ofter head'},
    {name:'Deadlift',set:4,rep:25},
    {name:'20 minute treadmill',set:4,rep:33},
    {name:'this is the other one',set:4,rep:70},
  ];

  readonly store = inject(BusinessStore);
  marketingService = inject(MarketingService);

  constructor() {
    this.store.loadAllByStateName('NE', 1);
  }

  addExercise(){
   
    this.exerciseList.push({name:'I added this',set:4,rep:50, hint:'do not lift ofter head'},)
  }
}
