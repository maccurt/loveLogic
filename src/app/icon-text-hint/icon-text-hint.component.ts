import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Url } from '../business-domain/Business';
import { MatCardModule } from '@angular/material/card';
import { ClipboardModule } from '@angular/cdk/clipboard';
@Component({
  selector: 'll-icon-text-hint',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ClipboardModule
  ],
  templateUrl: './icon-text-hint.component.html',
  styleUrl: './icon-text-hint.component.scss'
})
export class IconTextHintComponent {
  url = input.required<Url>();
  mode = input<number>(1);
}
