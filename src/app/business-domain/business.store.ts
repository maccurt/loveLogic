import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { BusinessService } from "./business.service";
import { Business, stateListMock, StateLocation } from './Business';
import { Category } from "./categroryListMock";
import { categroryListMock } from "./categroryListMock";
import { inject } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface BusinessState {
    isLoading: boolean;

    //business
    showBusiness: boolean;
    businessList: Business[],
    businessListFiltered: Business[],
    businessSelected: Business,
    businessSelectedCategory: Category;
    stateSelected: StateLocation,
    locationList: StateLocation[];
    categorySelected: Category
    categoryListUrl: string
    showCategory: boolean;
    categoryList: Category[],
    compactMode: boolean,
    isMobile: boolean
};

const businessInitialState: BusinessState = {
    categoryListUrl: '',
    businessSelected: new Business(),
    businessSelectedCategory: categroryListMock[0],
    showBusiness: false,
    businessList: [],
    businessListFiltered: [],
    categoryList: categroryListMock,
    categorySelected: categroryListMock[0],
    locationList: [],
    stateSelected: stateListMock[0],
    isLoading: false,
    showCategory: false,
    compactMode: true,
    isMobile: false
};

export const BusinessStore = signalStore(
    { providedIn: 'root' },
    withHooks({
        //We init the store here regardless of user options (state location,etc)
        onInit(state, businessService = inject(BusinessService), breakpoint = inject(BreakpointObserver)) {

            businessService.locationList().subscribe((locationList) => {
                patchState(state, { locationList });
            });

            breakpoint.observe([Breakpoints.XSmall, Breakpoints.Small])
                .pipe(
                    map((b) => b.matches),
                    takeUntilDestroyed()
                ).subscribe((isMobile) => {
                    patchState(state, { isMobile });
                });
        }
    }),
    withState(businessInitialState),

    withMethods((store, businessService = inject(BusinessService)) => ({

        async loadAll(stateSelected: StateLocation): Promise<void> {

            const categoryListUrl = 'category-list/' + stateSelected.name;
            patchState(store, { isLoading: true, stateSelected: stateSelected, categoryListUrl });

            const businessList = await lastValueFrom(businessService.businessList(stateSelected.abbreviation));

            const businessSelected = businessList[0];

            const categoryList = businessService.getCategoryListWithCount(businessList);

            categoryList.forEach((c) => {
                c.businessListUrl = '/' + stateSelected.name + '/' + c.id;
            });

            //TODO if you go back and forth to states you migh want to set it to what it was
            //keep in mind all states do not share category, so time being set to first
            const categorySelected = categoryList[0];

            patchState(store, { businessSelected, categorySelected, businessList, businessListFiltered: businessList, categoryList, isLoading: false });
        },

        async loadAllByStateName(state: string) {
            const stateSelected = stateListMock.find((s) => {
                return s.name.toLocaleLowerCase() === state?.toLocaleLowerCase() ||
                    s.abbreviation.toLocaleLowerCase() === state?.toLocaleLowerCase();
            });

            if (stateSelected) {
                this.loadAll(stateSelected);
            }
            else {
                this.loadAll(stateListMock[0]); //todo this is a problem make this not use mock
            }
        },

        async filterByCategoryId(categoryId: number): Promise<void> {

            const category = store.categoryList().find((c) => {
                return c.id === categoryId;
            });

            if (category) {
                this.filter(category);
            }
        },
        async filter(categorySelected: Category): Promise<void> {
            patchState(store, { isLoading: true });

            if (!categorySelected) {
                categorySelected = store.categoryList()[0];
            }

            let businessListFiltered: Business[];

            if (categorySelected.id === 0) {
                businessListFiltered = store.businessList();
            }
            else {
                businessListFiltered = store.businessList().filter((b) => {
                    return b.categoryId === categorySelected.id;
                });
            }
            patchState(store, { categorySelected, showCategory: false, businessListFiltered, isLoading: false });
        },
        showCategoryToggle() {
            patchState(store, { showCategory: !store.showCategory() });
        },
        compact(compactMode: boolean) {
            patchState(store, { compactMode });
        },
        showBusinessToggle(showBusiness: boolean) {
            patchState(store, { showBusiness });
        },
        showSelectedBusiness(businessSelected: Business) {

            patchState(store, { businessSelected });

            const businessSelectedCategory = store.categoryList().find((c) => { return c.id === businessSelected.categoryId })
            if (businessSelectedCategory) {
                patchState(store, { businessSelectedCategory });
            }
            else {
                patchState(store, { businessSelectedCategory: categroryListMock[0] });
            }
            this.showBusinessToggle(true);
        }
    }))
);