import { IncomeStatementService } from "./income-statement.service";
import { ExpenseType, IncomeStatement } from "../IncomeStatement";

describe('calculateIncomeStatmentProperties', () => {

    let service = new IncomeStatementService();
    it('Printify Shirt 14.95 income statement', () => {

        const i = new IncomeStatement();
        i.revenue = 14.95;
        i.costOfGoodsSold = 11.42;
        i.taxRate = 35;
        
        i.expenseList.push({ name: 'order fee', modifier: 1, expenseType: ExpenseType.fixedFee });
        i.expenseList.push({ name: 'Ebay', modifier: 13.25, expenseType: ExpenseType.percentOfRevenue });

        service.calculateIncomeStatmentProperties(i);
        expect(i.grossProfitBeforeExpenses).toBe(3.53);
        //expenses
        expect(i.expenseList[0].value).toBe(1)
        expect(i.expenseList[1].value).toBe(1.98)        
        expect(i.expense).toBe(2.98)
        //-----------------------------------------        
        expect(i.grossProfitAfterExpense).toBe(.55);        
        expect(i.taxes).toBe(.19);
        expect(i.netIncome).toBe(.36);

    });
});