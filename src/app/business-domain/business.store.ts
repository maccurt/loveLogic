import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { BusinessService } from "./business.service";
import { Business, Category, categroryListMock, stateListMock, StateLocation } from './Business';
import { inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

interface BusinessState {
    isLoading: boolean;
    businessList: Business[],
    businessListFiltered: Business[],
    stateSelected: StateLocation,
    locationList: StateLocation[];
    //category
    categorySelected: Category
    categoryListUrl: string
    showCategory: boolean;
    categoryList: Category[],

};

const businessInitialState: BusinessState = {
    categoryListUrl: '',
    businessList: [],
    businessListFiltered: [],
    categoryList: categroryListMock,
    categorySelected: categroryListMock[0],
    locationList: [],
    stateSelected: stateListMock[0],
    isLoading: false,
    showCategory: false
};

export const BusinessStore = signalStore(
    { providedIn: 'root' },
    withState(businessInitialState),
    withMethods((store, businessService = inject(BusinessService)) => ({


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

        async loadAll(stateSelected: StateLocation): Promise<void> {
            const categoryListUrl = 'category-list/' + stateSelected.name;
            patchState(store, { isLoading: true, stateSelected: stateSelected, categoryListUrl });
            const businessList = await lastValueFrom(businessService.businessList(stateSelected.abbreviation));
            const categoryList = businessService.getCategoryListWithCount(businessList);

            categoryList.forEach((c) => {
                c.businessListUrl = '/' + stateSelected.name + '/' + c.id;
            })

            //TODO if you go back and forth to states you migh want to set it to what it was
            //keep in mind all states do not share category, so time being set to first
            const categorySelected = categoryList[0];

            patchState(store, { categorySelected, businessList, businessListFiltered: businessList, categoryList, isLoading: false });
        },

        async filter(categorySelected: Category): Promise<void> {
            patchState(store, { isLoading: true });

            if (!categorySelected) {
                categorySelected = store.categoryList()[0]
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
        }
    }))
);