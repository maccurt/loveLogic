import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { BusinessService } from "./business.service";
import { Business, stateListMock, StateLocation } from './Business';
import { Category } from "../category-domain/category/Category";
import { computed, inject } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { CategoryStore } from '../category-domain/category.store';
import { categoryMyFavorite, CategoryService } from '../category-domain/category.service';
import { businessCategoryListChanged } from '../category-domain/category-events';
import { Dispatcher } from '@ngrx/signals/events';

type BusinessState = {
    domainUrl: string;
    isLoading: boolean;
    isBusinessShown: boolean;
    businessList: Business[],
    businessSelected: Business,
    businessSelectedCategory: Category;
    stateSelected: StateLocation,
    locationList: StateLocation[];
    categoryListUrl: string
    showCategory: boolean;
    categoryList: Category[]
};

const businessInitialState: BusinessState = {
    domainUrl: '',
    categoryListUrl: '',
    businessSelected: new Business(),
    businessSelectedCategory: new Category(),
    isBusinessShown: false,
    businessList: [],
    categoryList: [],
    locationList: [],
    stateSelected: stateListMock[0],
    isLoading: true,
    showCategory: false
};

export const BusinessStore = signalStore(
    { providedIn: 'root' },
    withState(businessInitialState),
    withHooks({
        //We init the store here regardless of user options (state location,etc)
        onInit(state,
            businessService = inject(BusinessService)
        ) {
            const domainUrl = document.location.origin;
            businessService.locationList().subscribe((locationList) => {
                patchState(state, { locationList, domainUrl });
            });
        }
    }),
    withMethods((
        store,
        businessService = inject(BusinessService),
        categoryService = inject(CategoryService),
        dispatcher = inject(Dispatcher)
    ) => ({

        async loadAll(stateSelected: StateLocation, businessId = 0): Promise<void> {

            const categoryListUrl = 'category-list/' + stateSelected.name;
            patchState(store, { isLoading: true, stateSelected: stateSelected, categoryListUrl });
            const businessList = await lastValueFrom(businessService.businessList(stateSelected.abbreviation));
            const businessSelected = businessList[0];
            const categoryList = categoryService.getDistinctCategoryForEnityList(businessList);

            //This will tell the CATEGORY store that the list was updated
            dispatcher.dispatch(businessCategoryListChanged.listChanged(categoryList))


            //TODO 
            categoryList.forEach((c) => {
                c.businessListUrl = '/' + stateSelected.name + '/' + c.id;
            });

            //TODO make sure all states have a favorite
            const categorySelected = categoryMyFavorite;

            patchState(store, {
                businessSelected, businessList, categoryList, isLoading: false
            });

            //filter to the favorite for the time being
            //this.filterByCategoryId(categorySelected.id);

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


        // compact(compactMode: boolean) {
        //     patchState(store, { compactMode });
        // },
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
                throw new Error('why wold this ever happen');
                // patchState(store, { businessSelectedCategory: categroryListMock[0] });
            }

            patchState(store, { businessSelected, isBusinessShown: true });
        }
    })),
    withComputed((store) => {

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