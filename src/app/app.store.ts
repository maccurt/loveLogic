import { signalStore, withState, withMethods, patchState } from "@ngrx/signals"
import { StateLocation, stateListMock } from "./business-domain/Business"
import { ActivatedRoute, ParamMap } from "@angular/router"
import { inject } from "@angular/core"

//global app state
interface AppState {
    stateSelected: StateLocation
    stateList: StateLocation[]
}

const appInitialState: AppState = {
    stateSelected: stateListMock[0],
    stateList: stateListMock
}

export const AppStore = signalStore(
    { providedIn: 'root' },
    withState(appInitialState),
    withMethods((store, route = inject(ActivatedRoute)) => ({

        async setState(stateLocation: StateLocation) {

            patchState(store, { stateSelected: stateLocation })
        },

        isStatedSelectedInParm(paramMap: ParamMap): boolean {
            //get location from route
            const state = paramMap.get('state');
            const stateSelected = store.stateList().find((s) => {
                return s.name.toLocaleLowerCase() === state?.toLocaleLowerCase() ||
                    s.abbreviation.toLocaleLowerCase() === state?.toLocaleLowerCase();
            });

            if (stateSelected) {
                patchState(store, { stateSelected })
                return true
            }

            if (store.stateSelected()) {
                return false
            }
            else {
                patchState(store, { stateSelected: store.stateList()[0] })
            }
            return false;

        }
    }))
)