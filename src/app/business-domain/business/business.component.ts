import { Component, input } from '@angular/core';
import { Business } from '../Business';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskPipe } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
@Component({
    selector: 'll-business',
    imports: [MatCardModule, NgxMaskPipe, MatIconModule],
    templateUrl: './business.component.html',
    styleUrl: './business.component.scss'
})
export class BusinessComponent {
  business = input.required<Business>();
  compactMode = input<boolean>();
}