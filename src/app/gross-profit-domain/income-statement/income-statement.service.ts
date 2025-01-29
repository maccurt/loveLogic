import { Injectable } from '@angular/core';
import { ExpenseType, IncomeStatement, IncomeStatementExpense } from './income-statement-store';

@Injectable({
  providedIn: 'root'
})
export class IncomeStatementService {

  constructor() { }

  round(number: number): number {
    return Math.round(number * 100) / 100;
  }

  getIncomeStatement(revenue: number, cogs: number, expenseList: IncomeStatementExpense[] = []): IncomeStatement {

    const i = new IncomeStatement();
    i.revenue = revenue;
    i.costOfGoodsSold = cogs;
    i.expenseList = expenseList;
    this.calculateIncomeStatement(i);
    return i;
  }

  calculateIncomeStatement(i: IncomeStatement) {
    i.grossProfit = this.grossProfit(i);
  }

  expensePercentOfRevenue(revenue: number, percentOfRevenue: number) {
    const expense = this.round(revenue * (percentOfRevenue / 100));
    return expense;
  }

  setExpenseTotal(i: IncomeStatement) {
    let expenseTotal = 0;
    i.expenseList.forEach((e) => {

      e.value = 0;

      switch (e.expenseType) {
        case ExpenseType.percentOfRevenue:
          e.value = this.expensePercentOfRevenue(i.revenue, e.modifier)
          break;
        case ExpenseType.fixedFee:
          e.value = e.modifier
      }

      expenseTotal = expenseTotal + e.value;


    });
    i.expense = expenseTotal;
  }

  grossProfit(i: IncomeStatement): number {
    this.setExpenseTotal(i);
    return this.round(i.revenue - i.costOfGoodsSold - i.expense);
  }

}
