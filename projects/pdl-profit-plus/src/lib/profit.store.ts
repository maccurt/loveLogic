import { signalStore,withState } from "@ngrx/signals";

export interface ProfitState {
    revenue:number;
};

const profitStateInit: ProfitState ={
    revenue:99.99
};

export const ProfitStore = signalStore(
    { providedIn: 'root' },    
    withState(profitStateInit)
)