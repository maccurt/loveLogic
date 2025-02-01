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

  setExpenseTotal(incomeStatement: IncomeStatement) {
    
    let expenseTotal = 0;
    incomeStatement.expenseList.forEach((expense) => {

      expense.value = 0;
      switch (expense.expenseType) {
        case ExpenseType.percentOfRevenue:
          expense.value = this.expensePercentOfRevenue(incomeStatement.revenue, expense.modifier)
          break;
        case ExpenseType.fixedFee:
          expense.value = expense.modifier
      }

      expenseTotal = expenseTotal + expense.value;

    });
    incomeStatement.expense = expenseTotal;
  }

  grossProfit(i: IncomeStatement): number {
    this.setExpenseTotal(i);
    return this.round(i.revenue - i.costOfGoodsSold - i.expense);
  }

}
