import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { BusinessService } from "./business.service";
import { Business, stateListMock, StateLocation } from './Business';
import { Category, categoryMyFavorite } from "./categroryListMock";
import { categroryListMock } from "./categroryListMock";
import { inject } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Marketing, SafetyMarketing_MOCK } from '../marketing-domain/Marketing';
import { MarketingService } from '../marketing-domain/marketing.service';

interface BusinessState {
    brandName: string;
    brandTagline: string;
    domainUrl: string;
    isLoading: boolean;
    //business
    isBusinessShown: boolean;
    businessList: Business[],
    businessListFiltered: Business[],
    businessSelected: Business,
    businessSelectedCategory: Category;
    businessSelectedMarketing: Marketing;
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
    brandName: 'Can We Meet To Talk?',
    brandTagline: 'Beyond Texting & Messaging',
    domainUrl: '',
    businessSelectedMarketing:SafetyMarketing_MOCK,
    categoryListUrl: '',
    businessSelected: new Business(),
    businessSelectedCategory: categroryListMock[0],
    isBusinessShown: false,
    businessList: [],
    businessListFiltered: [],
    categoryList: categroryListMock,
    categorySelected: categroryListMock[0],
    locationList: [],
    stateSelected: stateListMock[0],
    isLoading: true,
    showCategory: false,
    compactMode: true,
    isMobile: false
};

export const BusinessStore = signalStore(
    { providedIn: 'root' },
    withHooks({
        //We init the store here regardless of user options (state location,etc)
        onInit(state,
            businessService = inject(BusinessService),
            breakpoint = inject(BreakpointObserver)
        ) {
            const domainUrl = document.location.origin;
            businessService.locationList().subscribe((locationList) => {
                patchState(state, { locationList, domainUrl });
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

    withMethods((
        store,
        businessService = inject(BusinessService),
        marketingService = inject(MarketingService),
    ) => ({

        async loadAll(stateSelected: StateLocation, businessId = 0): Promise<void> {

            const categoryListUrl = 'category-list/' + stateSelected.name;
            patchState(store, { isLoading: true, stateSelected: stateSelected, categoryListUrl });

            const businessList = await lastValueFrom(businessService.businessList(stateSelected.abbreviation));
            console.log(businessList);

            const businessSelected = businessList[0];

            const categoryList = businessService.getCategoryListWithCount(businessList);

            categoryList.forEach((c) => {
                c.businessListUrl = '/' + stateSelected.name + '/' + c.id;
            });

            //TODO make sure all states have a favorite
            const categorySelected = categoryMyFavorite;

            patchState(store, {
                businessSelected, categorySelected, businessList, categoryList, isLoading: false
            });

            //filter to the favorite for the time being
            this.filterByCategoryId(categorySelected.id);

            if (businessId > 0) {
                this.showSelectedBusinessById(businessId);
            }
        },

        async loadAllByStateName(state: string, businessId: number) {
            const stateSelected = stateListMock.find((s) => {
                return s.name.toLocaleLowerCase() === state?.toLocaleLowerCase() ||
                    s.abbreviation.toLocaleLowerCase() === state?.toLocaleLowerCase();
            });

            if (stateSelected) {

                this.loadAll(stateSelected, businessId);

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
                categorySelected = categoryMyFavorite;
            }

            let businessListFiltered: Business[];

            if (categorySelected.id === 0) {
                businessListFiltered = store.businessList().filter((b) => {
                    return b.rank === 1;
                });
            }
            else {
                businessListFiltered = store.businessList().filter((b) => {
                    return b.categoryId === categorySelected.id;
                });
            }

            if (businessListFiltered.length === 0 && store.businessList().length >= 3) {

                businessListFiltered.push(store.businessList()[0]);
                businessListFiltered.push(store.businessList()[1]);
                businessListFiltered.push(store.businessList()[2]);
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

            patchState(store, { isBusinessShown: showBusiness });
        },

        showSelectedBusinessById(id: number) {
            const businessSelected = store.businessList().find((b) => { return b.id === id; });
            if (businessSelected) {
                this.showBusiness(businessSelected);
            }
        },

        showBusiness(businessSelected: Business) {
            if (store.isBusinessShown()) {
                return;
            }
            const businessSelectedCategory = store.categoryList().find((c) => { return c.id === businessSelected.categoryId; });
            if (businessSelectedCategory) {
                patchState(store, { businessSelectedCategory });
            }
            else {
                patchState(store, { businessSelectedCategory: categroryListMock[0] });
            }

            const businessSelectedMarketing = marketingService.getBusinessSafety(businessSelected);

            patchState(store, { businessSelected ,  businessSelectedMarketing,  isBusinessShown: true });
        }
    }))
);