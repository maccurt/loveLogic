import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals"
import { Category, CategoryId } from "./category/Category"
import { CategoryService } from "./category.service"
import { computed, inject } from "@angular/core"
import { firstValueFrom, switchMap, tap } from "rxjs"
import { BusinessStore } from "../business-domain/business.store"
import { type } from '@ngrx/signals';
import { eventGroup, withReducer, on, withEventHandlers, Events } from '@ngrx/signals/events';
import { businessCategoryListChanged } from "./category-events";
import { withDevtools } from "@angular-architects/ngrx-toolkit"

type CategoryState = {
    categorySelected: Category;
    categoryList: Category[];    
    entityCategoryList: CategoryId[];
}

const categoryStateInitial: CategoryState = {
    categorySelected: new Category(),
    categoryList: [],
    entityCategoryList: [],    
}

export const CategoryStore = signalStore(
    { providedIn: 'root' },
    withDevtools('categoryStore'),
    withState(categoryStateInitial),
    withReducer(
        on(businessCategoryListChanged.listChanged, ({ payload: entityCategoryList }) => ({
            entityCategoryList
        }))
    ),

    withMethods((store,
        service = inject(CategoryService)) => ({
           
            async loadCategories() {
                
                const categoryList = await firstValueFrom(service.getCategoryList());
                const categorySelected = categoryList[0];                
                patchState(store, { categorySelected, categoryList });
            },

            categorySelectedEvent(categorySelected: Category) {
                patchState(store, { categorySelected });

            },
            //TODO I do not like this, look in component and make it send it? Maybe this is ok
            async filterByCategoryId(categoryId: number): Promise<void> {

                const category = store.categoryList().find((c) => {
                    return c.id === categoryId;
                });

                if (category) {
                    this.categorySelectedEvent(category);
                }
            },
        })),

    withHooks({
        onInit: (store) => {
            store.loadCategories();

        }
    }),
    withComputed((store, categoryService = inject(CategoryService)) => (
        {
            categoryListFiltered: computed(() => {
                //this will be a list of business objects that have a categoryId,etc
                //in the future it could be articles, etc                                
                const categoriesForEnity = store.entityCategoryList()
                const filter = categoryService.getDistinctCategoryForEnityList(categoriesForEnity, store.categoryList());
                return filter;
            }),

        })
    ))     