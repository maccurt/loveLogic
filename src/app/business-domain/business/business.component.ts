import { Component, input } from '@angular/core';
import { Business } from '../Business';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskPipe } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'll-business',
  standalone: true,
  imports: [MatCardModule, NgxMaskPipe, MatIconModule,JsonPipe],

  templateUrl: './business.component.html',
  styleUrl: './business.component.scss'
})
export class BusinessComponent {
  business = input.required<Business>();
  compactMode = input<boolean>();
}
