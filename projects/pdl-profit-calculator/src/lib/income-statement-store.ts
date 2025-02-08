import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { IncomeStatementService } from "./income-statement-service/income-statement.service";
import { IncomeStatement, IncomeStatementExpense } from "./IncomeStatement";

export interface IncomeStatementState {
    revenue: number;
    costOfGoodsSold: number;
    incomeStatementList: IncomeStatement[]
    taxRatePercent: number;
    imageUrl: string;
    name: string;
    description: string;
}

const incomeStatementInitialState: IncomeStatementState = {
    revenue: 100,
    taxRatePercent: 0,
    costOfGoodsSold: 0,
    incomeStatementList: [],
    imageUrl: '',
    name: 'name from store',
    description: ''
};

export const IncomeStatementStore = signalStore(
    { providedIn: 'root' },
    withState(incomeStatementInitialState),
    withMethods(
        (store, incomeStatementService = inject(IncomeStatementService)) => ({

            loadFromState(state: IncomeStatementState) {

                state.incomeStatementList.forEach((i) => {
                    incomeStatementService.calculateIncomeStatmentProperties(i);
                });

                patchState(store, { ...state });

            },
            async load(revenue: number, costOfGoodsSold: number, taxRatePercent: number): Promise<void> {
                const incomeStatementList: IncomeStatement[] = [];

                const i = incomeStatementService.incomeStatementFactory(revenue, costOfGoodsSold, [], taxRatePercent);
                incomeStatementList.push(i);
                patchState(store, { revenue, costOfGoodsSold, incomeStatementList, taxRatePercent });
            },

            update(revenue: number, costOfGoodsSold: number) {
                const incomeStatementList = store.incomeStatementList();

                incomeStatementList.forEach((i) => {
                    i.revenue = revenue;
                    i.costOfGoodsSold = costOfGoodsSold;
                    incomeStatementService.calculateIncomeStatmentProperties(i);
                });

                patchState(store, { revenue, costOfGoodsSold, incomeStatementList });
            },

            addIncomeStatement(name: string, expenseList: IncomeStatementExpense[] = []) {

                const incomeStatementList = store.incomeStatementList();

                const i = incomeStatementService.incomeStatementFactory(store.revenue(), store.costOfGoodsSold(), expenseList, store.taxRatePercent());
                i.name = name;

                patchState(store, { incomeStatementList: [...incomeStatementList, i] });
            }
        })
    ),
    withComputed((state) => (
        {
            incomeStatementCount: computed(() => state.incomeStatementList().length),
            expenseGreatestCount: computed(() => {

                state.incomeStatementList();

                if (state.incomeStatementList().length === 0) {
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

