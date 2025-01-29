import { TestBed } from "@angular/core/testing";
import { ExpenseType, IncomeStatement, IncomeStatementStore } from "./income-statement-store";
import { IncomeStatementService } from "./income-statement.service";

describe('income statement store test', () => {
    //TODO Learn is this bad pattern?
    let store: InstanceType<typeof IncomeStatementStore>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                IncomeStatementStore,
                IncomeStatementService
            ]
        });
        store = TestBed.inject(IncomeStatementStore);
    });

    it('there should be income statements', () => {
        expect(store.incomeStatementList().length).toEqual(0);
    });

    describe('load store with a income statement', () => {
        let i1: IncomeStatement;
        beforeEach(() => {
            store.load(100, 30);
            i1 = store.incomeStatementList()[0];
        });

        it('load store with 100 of revenu', () => {
            expect(i1.revenue).toBe(100);
            expect(i1.costOfGoodsSold).toBe(30);
            expect(i1.grossProfit).toBe(70);
        });

        it('', () => {
            store.update(110, 30);
            expect(i1.revenue).toBe(110);
            expect(i1.grossProfit).toBe(80);
        });

        it('add an income statement', () => {
            store.addIncomeStatement();
            expect(store.incomeStatementList().length).toBe(2);
            expect(store.incomeStatementList()[1].revenue).toBe(100);
            expect(store.incomeStatementList()[1].costOfGoodsSold).toBe(30);
            expect(store.incomeStatementList()[1].grossProfit).toBe(70);
            store.update(200, 70);
            expect(store.incomeStatementList()[0].revenue).toBe(200);
            expect(store.incomeStatementList()[1].revenue).toBe(200);
        });

        it('add an income statement with 3% seller fee', () => {

            store.addIncomeStatement([{ name: 'Ebay', modifier: 3, expenseType: ExpenseType.percentOfRevenue }]);
            expect(store.incomeStatementList().length).toBe(2);
            const i = store.incomeStatementList()[1];
            expect(i.revenue).toBe(100);
            expect(i.costOfGoodsSold).toBe(30);
            //there should be an expense
            expect(i.expenseList.length).toBe(1);
            const e = i.expenseList[0];
            expect(e.value).toBe(3);
            //gross profit should be affected by expense
            expect(i.expense).toBe(3); //3% of 100 is 3
            expect(i.grossProfit).toBe(67);

        });
    });
});


