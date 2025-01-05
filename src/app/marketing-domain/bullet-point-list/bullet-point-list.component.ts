import { Component, input, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Marketing, MarketingBulletpoint, SafetyIsAPriority_MOCK } from '../marketing/Marketing';
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

  marketing = input.required<Marketing>();
  ngOnInit(): void {    

  }

}
