import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IncomeStatementStore } from './income-statement-store';

import { DecimalPipe } from '@angular/common';
import { debounceTime } from 'rxjs';
import { incomeStatementStateMock } from './income-statement-service/mocks/incomeStatementState_MOCK';

@Component({
  selector: 'lib-pdl-profit-calculator',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    DecimalPipe
  ],
  templateUrl: 'pdl-profit-calculator.component.html',
  styleUrl: 'pdl-profit-calculator.component.scss'
})
export class IncomeStatementComponent implements OnInit {
  fb = inject(FormBuilder);
  store = inject(IncomeStatementStore);

  form = this.fb.group({
    revenue: this.fb.nonNullable.control(1)
  });

  ngOnInit(): void {

    this.store.loadFromState(incomeStatementStateMock);

    this.form.patchValue({
      revenue: this.store.revenue()
    });

    this.form.controls.revenue.valueChanges
      .pipe(debounceTime(500)).
      subscribe((x) => {
        //TODO add cogs here properly not like this
        this.store.update(x,this.store.costOfGoodsSold());
      });

  }
}
