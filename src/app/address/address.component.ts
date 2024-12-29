import { Component, input } from '@angular/core';
import { Address } from './Adress';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'll-address',
  imports: [NgxMaskPipe],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {

  address = input.required<Address>();

}
