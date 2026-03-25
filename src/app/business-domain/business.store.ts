import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { BusinessService } from "./business.service";
import { Business, NEBRASKA_STATE } from './Business';
import { Category } from "../category-domain/category/Category";
import { computed, inject } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { CategoryStore } from '../category-domain/category.store';
import { CategoryService } from '../category-domain/category.service';
import { businessCategoryListChanged } from '../category-domain/category-events';
import { Dispatcher } from '@ngrx/signals/events';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

type BusinessState = {
    domainUrl: string;
    isLoading: boolean;
    isBusinessShown: boolean;
    businessList: Business[],
    businessSelected: Business,    
    showCategory: boolean;
    categoryList: Category[]
};

const businessInitialState: BusinessState = {
    domainUrl: '',
    businessSelected: new Business(),    
    isBusinessShown: false,
    businessList: [],
    categoryList: [],
    isLoading: true,
    showCategory: false
};

export const BusinessStore = signalStore(
    { providedIn: 'root' },
    withDevtools('businessStore'),
    withState(businessInitialState),
    withMethods((
        store,
        businessService = inject(BusinessService),
        categoryService = inject(CategoryService),
        dispatcher = inject(Dispatcher)
    ) => ({

        async load(): Promise<void> {

            const businessList = await lastValueFrom(businessService.businessList(NEBRASKA_STATE.abbreviation));

            //TODO this will tell the filter what categories to show
            const categoryList = categoryService.getDistinctCategoryForEnityList(businessList);
            dispatcher.dispatch(businessCategoryListChanged.listChanged(categoryList))

            //What is this doing?
            const domainUrl = document.location.origin;
            patchState(store, { isLoading: false, businessList, domainUrl, businessSelected: businessList[0] })
        },

        showBusinessToggle(showBusiness: boolean) {
            patchState(store, { isBusinessShown: showBusiness });
        },
        showBusiness(businessSelected: Business) {
            if (store.isBusinessShown()) {
                return;
            }
            patchState(store, { businessSelected, isBusinessShown: true });
        }

    })),
    withHooks({

        onInit(store) {
            store.load();
        }
    }),
    withComputed((store) => {

        //TODO Priority
        //now this has dependecy on the category store
        //TODO do we want to remove this and use the event system?
        //YES, but work on customer functionality first and do this next
        const categoryStore = inject(CategoryStore);
        return {

            businessListFiltered: computed(() => {
                const category = categoryStore.categorySelected();

                let filtered: Business[];

                if (category.id === 0) {
                    filtered = store.businessList().filter((b) => {
                        return b.rank === 1;
                    });
                }
                else {
                    filtered = store.businessList().filter((b) => {
                        return b.categoryId === category.id;
                    });
                }

                return filtered;
            })
        }
    })
);

//Remove all this to refactor, kept until we are fully tested.. it did something (awful!!!)
// showSelectedBusinessById(id: number) {
//     const businessSelected = store.businessList().find((b) => { return b.id === id; });
//     if (businessSelected) {
//         this.showBusiness(businessSelected);
//     }
// },
// async loadAll(stateSelected: StateLocation, businessId = 0): Promise<void> {

//     patchState(store, { isLoading: true });

//     const businessList = await lastValueFrom(businessService.businessList(stateSelected.abbreviation));
//     const businessSelected = businessList[0];

//     //TODO this will tell the filter what categories to show
//     const categoryList = categoryService.getDistinctCategoryForEnityList(businessList);
//     dispatcher.dispatch(businessCategoryListChanged.listChanged(categoryList))

//     patchState(store, {
//         businessSelected, businessList, categoryList, isLoading: false
//     });

//     //TODO what is this doing, what will this accomplish
//     if (businessId > 0) {
//         this.showSelectedBusinessById(businessId);
//     }
// },

// async loadAllByStateName(state: string, businessId: number) {
//     const stateSelected = STATE_LIST_MOCK.find((s) => {
//         return s.name.toLocaleLowerCase() === state?.toLocaleLowerCase() ||
//             s.abbreviation.toLocaleLowerCase() === state?.toLocaleLowerCase();
//     });

//     if (stateSelected) {
//         this.loadAll(stateSelected, businessId);

//     }
//     else {
//         this.loadAll(STATE_LIST_MOCK[0]); //todo this is a problem make this not use mock
//     }
// },

// compact(compactMode: boolean) {
//     patchState(store, { compactMode });
// },