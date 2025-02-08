import { Component, input, inject } from '@angular/core';
import { IncomeStatement } from '../IncomeStatement';
import { DecimalPipe } from '@angular/common';
import { IncomeStatementStore } from '../income-statement-store';

@Component({
  selector: 'lib-income-statement',
  imports: [
    DecimalPipe
  ],
  templateUrl: './income-statement.component.html',
  styleUrl: './income-statement.component.css'
})
export class IncomeStatementComponent {

  i = input.required<IncomeStatement>();
  store = inject(IncomeStatementStore);


}
