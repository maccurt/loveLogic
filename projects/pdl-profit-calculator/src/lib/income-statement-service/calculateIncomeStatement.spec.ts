import { IncomeStatement } from "../IncomeStatement";
import { IncomeStatementService } from "./income-statement.service";
import { IncomeStatement_Ebay_MOCK } from "./mocks/incomeStatementState_MOCK";

describe('calculateIncomeStatmentProperties', () => {

    describe('Printify', () => {

        it('EBay shirt', () => {
            //arrange
            const i: IncomeStatement = { ...IncomeStatement_Ebay_MOCK };
            //act
            service.calculateIncomeStatmentProperties(i);
    
            //assert
            expect(i.grossProfitBeforeExpenses).toBe(4.57);
            expect(i.expenseList[0].value).toBe(2.12);
            expect(i.expenseList[1].value).toBe(.3);
            expect(i.expense).toBe(2.42);
            expect(i.grossProfitAfterExpense).toBe(2.15);
            expect(i.taxes).toBe(.75);
            expect(i.netIncome).toBe(1.40);
        });
        
    });
    const service = new IncomeStatementService();
    
});