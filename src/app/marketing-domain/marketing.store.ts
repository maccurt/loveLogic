import { signalStore, withMethods, withState } from "@ngrx/signals";
import { CanWeTalkMarketing_Mock, Marketing } from "./Marketing";
import { inject } from "@angular/core";
import { MarketingService } from "./marketing.service";
import { Business } from "../business-domain/Business";

interface MarketingState {
    moodMarketing: Marketing
}

const marketingInitialState: MarketingState = {
    moodMarketing: CanWeTalkMarketing_Mock
};

export const MarketingStore = signalStore(
    { providedIn: 'root' },
    withState(marketingInitialState),
    withMethods((
        store,
        marketingService = inject(MarketingService)) => (
        {
            getBusinessMarketing(business: Business): Marketing {

                return marketingService.getBusinessMarketing(business);
            }
        }
    ))
);