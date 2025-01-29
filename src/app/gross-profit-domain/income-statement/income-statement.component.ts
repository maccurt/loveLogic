import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ExpenseType, IncomeStatementStore } from './income-statement-store';
import { DecimalPipe } from '@angular/common';
import {PdNetIncomeCalculatorComponent} from 'pd-net-income-calculator'

@Component({
  selector: 'll-income-statement',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    DecimalPipe,
    PdNetIncomeCalculatorComponent

  ],
  templateUrl: './income-statement.component.html',
  styleUrl: './income-statement.component.scss'
})
export class IncomeStatementComponent implements OnInit {
  fb = inject(FormBuilder);
  store = inject(IncomeStatementStore);

  form = this.fb.group({
    revenue: this.fb.nonNullable.control(1, { updateOn: 'blur' })
  });

  ngOnInit(): void {

    this.store.load(19.97, 11).then(() => {
      this.store.addIncomeStatement('Ebay',[
        { name: "ebay % fee", modifier: 13.25, expenseType: ExpenseType.percentOfRevenue },
        { name: "per order fee", modifier: .30, expenseType: ExpenseType.fixedFee }
      ]);
      this.store.addIncomeStatement('Etsy',[
        { name: "Etsy % fee", modifier: 6.5, expenseType: ExpenseType.percentOfRevenue },
        { name: "per order fee", modifier: .20, expenseType: ExpenseType.fixedFee }
      ]);
    });

    this.form.patchValue({
      revenue: this.store.revenue()
    });

    this.form.controls.revenue.valueChanges.subscribe((x) => {
      this.store.update(x, 11);
    });

  }
}
