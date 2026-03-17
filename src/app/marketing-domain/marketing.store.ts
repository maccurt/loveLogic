import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Marketing, SafetyMarketing_MOCK } from "./Marketing";
import { Business } from "../business-domain/Business";
import { inject } from "@angular/core";
import { MarketingService } from "./marketing.service";

type MarketingState = {
    businessSelectedMarketing: Marketing;
}

const marketingStateInitial: MarketingState = {
    businessSelectedMarketing: SafetyMarketing_MOCK
}

export const MarketingStore = signalStore(
    { providedIn: 'root' },
    withState(marketingStateInitial),

    withMethods((store,service = inject(MarketingService)) => ({

        setBusinessMarketing: (business: Business) => {
            const businessSelectedMarketing  = service.getBusinessSafety(business);
            patchState(store,{businessSelectedMarketing});
        }   
    }))
)