import { NEBRASKA_STATE, STATE_LIST_MOCK, StateLocation, } from './business-domain/Business';
import { inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { patchState, signalStore, type, withHooks, withMethods, withState } from "@ngrx/signals"
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { Dispatcher, event, eventGroup } from '@ngrx/signals/events';
import { CategoryStore } from './category-domain/category.store';

type AppState = {
    brandName: string;
    brandTagline: string;
    showStateSelection: boolean;
    //
    isMobile: boolean;
    stateSelected: StateLocation,
    locationList: StateLocation[],
}

const AppStateInitial: AppState = {
    brandName: 'Can We Meet To Talk?',
    brandTagline: 'Beyond Texting & Messaging',
    isMobile: false,
    //
    showStateSelection: false,
    stateSelected: NEBRASKA_STATE,
    locationList: STATE_LIST_MOCK
}

export const AppStore = signalStore(
    { providedIn: 'root' },
    withDevtools('appStore'),
    withState(AppStateInitial),
    withMethods(
        (store, categoryStore = inject(CategoryStore), dispatcher = inject(Dispatcher)) => (
            {
                async load() {

                    await categoryStore.loadCategories()
                },
                stateLocationChange(stateSelected: StateLocation) {
                    patchState(store, { stateSelected })
                    dispatcher.dispatch(stateLocationEvents.stateLocationChanged(stateSelected))
                }
            }
        )
    ),
    withHooks({
        onInit(state, breakpoint = inject(BreakpointObserver)) {

            breakpoint.observe([Breakpoints.XSmall, Breakpoints.Small])
                .pipe(
                    map((b) => b.matches),
                    takeUntilDestroyed()
                ).subscribe((isMobile) => {
                    patchState(state, { isMobile });
                });
        }
    })
)

export const stateLocationEvents = eventGroup({
    source: 'State Location',
    events: {
        stateLocationChanged: type<StateLocation>()
    },
});