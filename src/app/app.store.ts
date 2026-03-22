import { inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { patchState, signalStore, withHooks, withState } from "@ngrx/signals"
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

type AppState = {
    brandName: string;
    brandTagline: string;
    showStateSelection: boolean;
    isMobile: boolean;
}

const AppStateInitial: AppState = {
    brandName: 'Can We Meet To Talk?',
    brandTagline: 'Beyond Texting & Messaging',
    isMobile: false,
    showStateSelection: false // this will remove the Nebraska, Georgia select
}

export const AppStore = signalStore(
    { providedIn: 'root' },
    withState(AppStateInitial),
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