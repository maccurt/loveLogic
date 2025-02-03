import { IncomeStatement } from "../IncomeStatement";
import { IncomeStatementService } from "./income-statement.service";
import { IncomeStatement_Ebay_MOCK } from "./mocks/incomeStatementState_MOCK";

describe('calculateIncomeStatmentProperties', () => {

    let service = new IncomeStatementService();
    it('Printify Shirt 14.95 income statement', () => {
        //arrange
        const i: IncomeStatement = { ...IncomeStatement_Ebay_MOCK };
        //act
        service.calculateIncomeStatmentProperties(i);

        //assert
        expect(i.grossProfitBeforeExpenses).toBe(3.53);
        expect(i.expenseList[0].value).toBe(1.98)
        expect(i.expenseList[1].value).toBe(.3)
        expect(i.expense).toBe(2.28)
        expect(i.grossProfitAfterExpense).toBe(1.25);
        expect(i.taxes).toBe(.44);
        expect(i.netIncome).toBe(.81);
    });
});