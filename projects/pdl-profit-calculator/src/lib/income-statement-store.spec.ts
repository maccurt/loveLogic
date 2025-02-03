import { TestBed } from "@angular/core/testing";
import { IncomeStatementStore } from "./income-statement-store";
import { ExpenseType } from "./IncomeStatement";
import { IncomeStatement } from "./IncomeStatement";
import { IncomeStatementService } from "./income-statement-service/income-statement.service";

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
            store.load(100, 30, 35);
            i1 = store.incomeStatementList()[0];
        });

        it('load store with 100 of revenu', () => {
            expect(i1.revenue).toBe(100);
            expect(i1.costOfGoodsSold).toBe(30);
        });

        it('', () => {
            store.update(110, 30);
            expect(i1.revenue).toBe(110);
        });

        it('add an income statement', () => {
            store.addIncomeStatement('Name of Product/etc.');
            expect(store.incomeStatementList().length).toBe(2);
            expect(store.incomeStatementList()[1].revenue).toBe(100);
            expect(store.incomeStatementList()[1].costOfGoodsSold).toBe(30);
            store.update(200, 70);
            expect(store.incomeStatementList()[0].revenue).toBe(200);
            expect(store.incomeStatementList()[1].revenue).toBe(200);
        });

        it('add an income statement with 3% seller fee', () => {

            store.addIncomeStatement('some name', [{ name: 'Ebay', modifier: 3, expenseType: ExpenseType.percentOfRevenue }]);
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
            expect(i.grossProfitAfterExpense).toBe(67);
        });

        describe('expenseGreatestCount', () => {

            it('should return 0', () => {
                expect(store.incomeStatementList().length).toBe(1);
                expect(store.expenseGreatestCount()).toBe(0);
            });

            it('should return 2', () => {
                store.addIncomeStatement('A', [{ name: 'Ebay', modifier: 3, expenseType: ExpenseType.percentOfRevenue }]);
                store.addIncomeStatement('B', [
                    { name: 'jedi', modifier: 3, expenseType: ExpenseType.percentOfRevenue },
                    { name: 'xxx', modifier: 3, expenseType: ExpenseType.percentOfRevenue }]);

                expect(store.expenseGreatestCount()).toBe(2);
            });

            it('', async () => {

                store.load(19.97, 11, 35).then(() => {
                    store.addIncomeStatement('Ebay', [
                        { name: "ebay % fee", modifier: 13.25, expenseType: ExpenseType.percentOfRevenue },
                        { name: "per order fee", modifier: .30, expenseType: ExpenseType.fixedFee }
                    ]);
                    store.addIncomeStatement('Etsy', [
                        { name: "Etsy % fee", modifier: 6.5, expenseType: ExpenseType.percentOfRevenue },
                        { name: "per order fee", modifier: .20, expenseType: ExpenseType.fixedFee }
                    ]);

                    expect(store.expenseGreatestCount()).toBe(2);
                });

            });
        });
    });
});

