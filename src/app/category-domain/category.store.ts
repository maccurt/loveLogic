import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals"
import { Category } from "./category/Category"
import { CategoryService } from "./category.service"
import { inject } from "@angular/core"
import { firstValueFrom, switchMap,tap } from "rxjs"
import { BusinessStore } from "../business-domain/business.store"
import { type } from '@ngrx/signals';
import { eventGroup, withReducer, on, withEventHandlers, Events } from '@ngrx/signals/events';
import { businessCategoryListChanged } from "./category-events";

type CategoryState = {
    categorySelected: Category;
    categoryList: Category[];
    //businessCategoryList: Category[];
}

const categoryStateInitial: CategoryState = {
    categorySelected: new Category(),
    categoryList: [],
    //businessCategoryList: [],
}

export const CategoryStore = signalStore(
    { providedIn: 'root' },
    withState(categoryStateInitial),    
    withReducer(
        on(businessCategoryListChanged.listChanged, ({ payload: list }) => ({
            categoryList: list
        })),
    ),

    withMethods((store,
        service = inject(CategoryService)) => ({

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
            async loadCategories() {
                const categoryList = await firstValueFrom(service.getCategoryList());

                //const businessCategoryList = service.getDistinctCategoryForEnityList(businessStore.businessList())
                const categorySelected = categoryList[0];
                patchState(store, { categorySelected, categoryList });
            }

        })),
    withHooks({
        onInit: (store) => {
            store.loadCategories();
        }
    }),

    //TODO remove this if we won't use this was a learning thing
    // withEventHandlers(
    //     (store, events = inject(Events)) => ({

    //         businessCategory$:events.on(
    //             businessCategoryListChanged.listChanged
    //         ).pipe(
    //             tap(console.log)
    //         )
    //     })
    // )
)