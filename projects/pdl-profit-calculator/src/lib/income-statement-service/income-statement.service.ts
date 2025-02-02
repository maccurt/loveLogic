import { Injectable } from '@angular/core';
import { ExpenseType, IncomeStatementExpense } from "../IncomeStatement";
import { IncomeStatement } from "../IncomeStatement";

@Injectable({
  providedIn: 'root'
})
export class IncomeStatementService {

  round(number: number): number {
    return Math.round(number * 100) / 100;
  }

  incomeStatementFactory(revenue: number, cogs: number, expenseList: IncomeStatementExpense[] = [], taxRate: number): IncomeStatement {
    const i = new IncomeStatement();
    i.revenue = revenue;
    i.costOfGoodsSold = cogs;
    i.expenseList = expenseList;
    i.taxRate = taxRate;
    this.calculateIncomeStatmentProperties(i);
    return i;
  }

  //Test for this method are in their own file.
  calculateIncomeStatmentProperties(i: IncomeStatement) {
    i.grossProfitBeforeExpenses = this.grossProfitBeforeExpenses(i.revenue, i.costOfGoodsSold);
    this.setExpenseTotal(i)

    i.grossProfitAfterExpense = this.grossProfitAfterExpense(i.revenue, i.costOfGoodsSold, i.expense);
    i.taxes = this.taxes(i.grossProfitAfterExpense, i.taxRate);
    i.netIncome = this.netIncome(i.grossProfitAfterExpense, i.taxes);
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
          expense.value = this.expensePercentOfRevenue(incomeStatement.revenue, expense.modifier);
          break;

        case ExpenseType.fixedFee:
          expense.value = expense.modifier;
          break;

        default:
          throw new Error('no switch for' + expense.expenseType.toString());
      }

      expenseTotal = expenseTotal + expense.value;

    });
    incomeStatement.expense = expenseTotal;
  }

  grossProfitByIncomeStatement(i: IncomeStatement): number {
    this.setExpenseTotal(i);
    return this.round(i.revenue - i.costOfGoodsSold - i.expense);
  }

  grossProfitAfterExpenses(revenue: number, costOfGoodsSold: number, expenseTotal: number) {
    return 0;
    // return revenue - costOfGoodsSold - e;
  }

  grossProfitBeforeExpenses(revenue: number, costOfGoodsSold: number) {
    return this.round(revenue - costOfGoodsSold);
  }

  grossProfitAfterExpense(revenue: number, costOfGoodsSold: number, expenseTotal: number): number {
    return this.round(revenue - costOfGoodsSold - expenseTotal);
  }

  taxes(grossProfit: number, taxRatePercent: number): number {
    return this.round(grossProfit * taxRatePercent / 100)
  }

  netIncome(grossProfit: number, taxes: number) {    
     return this.round(grossProfit - taxes);
  }
}