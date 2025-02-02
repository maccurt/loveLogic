import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IncomeStatementStore } from './income-statement-store';
import { ExpenseType } from "./IncomeStatement";
import { DecimalPipe } from '@angular/common';
import { debounceTime } from 'rxjs';

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

    this.store.load(19.97, 11,35).then(() => {
      
      this.store.addIncomeStatement('Ebay', [
        { name: "ebay % fee", modifier: 13.25, expenseType: ExpenseType.percentOfRevenue },
        { name: "per order fee", modifier: .30, expenseType: ExpenseType.fixedFee }
      ]);
      this.store.addIncomeStatement('Etsy', [
        { name: "Etsy % fee", modifier: 6.5, expenseType: ExpenseType.percentOfRevenue },
        { name: "per order fee", modifier: .20, expenseType: ExpenseType.fixedFee }
      ]);      
    });

    this.form.patchValue({
      revenue: this.store.revenue()
    });

    this.form.controls.revenue.valueChanges
      .pipe(debounceTime(500)).
      subscribe((x) => {
        this.store.update(x, 11);
      });

  }
}
