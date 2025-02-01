import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { IncomeStatementExpense, IncomeStatementService } from "./income-statement.service";
import { IncomeStatement } from "./IncomeStatement";

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
    // withHooks(
    //     {
    //         onInit(store) {

    //          }

    //     }
    // ),
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
                i.name = name;

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
                    return 0;
                }

                const lengthList: number[] = [];
                state.incomeStatementList().forEach((i) => {
                    lengthList.push(i.expenseList.length);
                });

                const sorted = lengthList.sort((a, b) => b - a);
                return sorted[0];
            })
        }
    ))
);

