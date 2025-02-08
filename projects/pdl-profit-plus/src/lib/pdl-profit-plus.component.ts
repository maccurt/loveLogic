import { Component, inject } from '@angular/core';
import { ProfitStore } from './profit.store';

@Component({
  selector: 'lib-pdl-profit-plus',
  imports: [],
  templateUrl: 'pdl-profit-plus.component.html',
  styleUrl: 'pdl-profit-plus.component.scss'
})
export class PdlProfitPlusComponent {

  store = inject(ProfitStore)

}
