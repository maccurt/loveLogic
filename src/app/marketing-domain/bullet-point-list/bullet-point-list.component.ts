import { Component, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MarketingBulletpoint } from '../marketing/Marketing';
import { TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'll-bullet-point-list',
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    TitleCasePipe],
  templateUrl: './bullet-point-list.component.html',
  styleUrl: './bullet-point-list.component.scss'
})
export class BulletPointListComponent implements OnInit { 


  bulletPointList = input<MarketingBulletpoint[]>([])


  ngOnInit(): void {
    
  }

}
