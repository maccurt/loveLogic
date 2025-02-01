import { computed, effect, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { IncomeStatementService } from "./income-statement.service";
import { orderBy, sortBy } from "lodash-es";


export class IncomeStatement {
    name?: string;
    revenue!: number;
    costOfGoodsSold!: number;
    expenseList: IncomeStatementExpense[] = [];
    expense!: number;
    grossProfit!: number;
    operatingExpenses!: number;
    netIncome!: number;
}

export enum ExpenseType {
    none = 0,
    percentOfRevenue = 1,
    fixedFee
}
export class IncomeStatementExpense {
    name!: string;
    modifier!: number;
    value?: number = 0;
    expenseType: ExpenseType = ExpenseType.none;
}

interface IncomeStatementState {
    revenue: number;
    costOfGoodsSold: number;
    incomeStatementList: IncomeStatement[]
}

const incomeStatementInitialState: IncomeStatementState = {
    revenue: 100,
    costOfGoodsSold: 0,
    incomeStatementList: []
};

export const IncomeStatementStore = signalStore(
    { providedIn: 'root' },
    withState(incomeStatementInitialState),
    //Hooks to add init,etc.
    withHooks(
        {
            onInit(store) { }

        }
    ),
    withMethods(
        (store, incomeStatementService = inject(IncomeStatementService)) => ({

            async load(revenue: number, costOfGoodsSold: number): Promise<void> {
                const incomeStatementList: IncomeStatement[] = [];

                const i = incomeStatementService.getIncomeStatement(revenue, costOfGoodsSold, undefined);
                incomeStatementList.push(i);
                patchState(store, { revenue, costOfGoodsSold, incomeStatementList });
            },

            update(revenue: number, costOfGoodsSold: number) {
                const incomeStatementList = store.incomeStatementList();

                incomeStatementList.forEach((i) => {
                    i.revenue = revenue;
                    i.costOfGoodsSold = costOfGoodsSold;
                    incomeStatementService.calculateIncomeStatement(i);
                });

                patchState(store, { revenue, costOfGoodsSold, incomeStatementList });
            },

            addIncomeStatement(name: string, expenseList: IncomeStatementExpense[] = []) {

                const incomeStatementList = store.incomeStatementList();

                const i = incomeStatementService.getIncomeStatement(store.revenue(), store.costOfGoodsSold(), expenseList);
                i.name = name

                incomeStatementList.push(i);

                patchState(store, { incomeStatementList });
            }
        })
    ),
    withComputed((state) => (
        {
            incomeStatementCount: computed(() => state.incomeStatementList().length),
            expenseGreatestCount: computed(() => {

                if (state.incomeStatementList().length === 0){
                    return 0
                }
                
                const lengthList: number[] = [];
                state.incomeStatementList().forEach((i) => {
                    lengthList.push(i.expenseList.length)
                });                

                const sorted = lengthList.sort((a, b) => b - a);
                return sorted[0]

            })
        }
    ))
);

