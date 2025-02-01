import { ExpenseType, IncomeStatementExpense } from "./IncomeStatement";
import { IncomeStatement } from "./IncomeStatement";
import { IncomeStatementService } from "./income-statement.service";

describe('', () => {
  let service: IncomeStatementService;
  let i: IncomeStatement;
  beforeEach(() => {
    service = new IncomeStatementService();
    i = new IncomeStatement();
    i.revenue = 10;
    i.costOfGoodsSold = 6;
  });

  it('no expenses should return 0', () => {
    service.setExpenseTotal(i);
    expect(i.expense).toBe(0);
  });

  it('REAL WORLD DATA', () => {
    const expenseList: IncomeStatementExpense[] = [
      { name: "ebay % fee", modifier: 13.25, expenseType: ExpenseType.percentOfRevenue },
      { name: "per order fee", modifier: .30, expenseType: ExpenseType.fixedFee }
    ];
    const incomeStatement = service.getIncomeStatement(19.97, 11, expenseList);
    expect(incomeStatement.expenseList[0].value).toBe(2.65);
  });

  it('3% fee of revenue ebay fee', () => {
    i.expenseList.push({ name: 'Ebay', modifier: 3, expenseType: ExpenseType.percentOfRevenue });
    service.setExpenseTotal(i);
    expect(i.expense).toBe(.30);
  });

  it('3% fee of revenue ebay fee', () => {
    i.expenseList.push({ name: 'Ebay', modifier: 1.25, expenseType: ExpenseType.fixedFee });
    service.setExpenseTotal(i);
    expect(i.expense).toBe(1.25);
  });

  it('3% fee of revenue ebay fee', () => {
    i.expenseList.push(
      { name: 'Ebay', modifier: 1, expenseType: ExpenseType.fixedFee },
      { name: 'Ebay', modifier: 3, expenseType: ExpenseType.percentOfRevenue }
    );
    expect(i.revenue).toBe(10);
    expect(i.costOfGoodsSold).toBe(6);
    service.setExpenseTotal(i);
    //we expect the 1.00 fee + 3% of 10 (revenue)
    // 1 + .30 = 1.30
    expect(i.expense).toBe(1.30);
  });

});
