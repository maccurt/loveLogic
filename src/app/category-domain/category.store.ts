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
    categoryListFiltered: Category[];
    entityCategoryList: CategoryId[];
}

const categoryStateInitial: CategoryState = {
    categorySelected: new Category(),
    categoryList: [],
    entityCategoryList: [],
    categoryListFiltered: []
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

            //LOAD***************
            async loadCategories() {

                console.log('hello');
                const categoryList = await firstValueFrom(service.getCategoryList());
                const categorySelected = categoryList[0];

                console.log(categoryList);
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
    withComputed((store,categoryService = inject(CategoryService)) => (
        {
            count: computed(() => store.entityCategoryList().length),
            categoryListFiltered: computed(() => { 
                
                const x =store.entityCategoryList()
                console.log(x);

                const cat = new Category();
                cat.name = x[0].categoryId.toString();
                return [cat]

                
            
            }),

        })      
    ))


      // withComputed(
        //     (store, categoryService = inject(CategoryService)) => {



        //         return {

        //             categoryCount:computed(()=>{
        //                 console.log('xxxxxxxxx')
        //                 return store.categoryList().length
        //             }),                
        //             filteredCategoryList: computed(() => {
        //                 const x = store.entityCategoryList();
        //                 const p =store.categoryList()
        //                 console.log(p)

        //                 console.log('???')

        //                 return [new Category()];

        //                 //return categoryService.getDistinctCategoryForEnityList(cat, store.categoryList())
        //             })
        //         }
        //     }
        // ),

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