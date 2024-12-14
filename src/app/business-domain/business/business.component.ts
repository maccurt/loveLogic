import { Component, effect, inject, input } from '@angular/core';
import { Business } from '../Business';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskPipe } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { BusinessStore } from '../business.store';
import { MatButtonModule } from '@angular/material/button';
@Component({
    selector: 'll-business',
    imports: [MatCardModule, NgxMaskPipe, MatIconModule,MatButtonModule],
    templateUrl: './business.component.html',
    styleUrl: './business.component.scss'
})
export class BusinessComponent {
  business = input.required<Business>();
  compactMode = input<boolean>();
  public readonly store = inject(BusinessStore)

  constructor() {


    effect(()=>{

      this.business().urlList;      
      console.log('hello world');
    })


  }
}