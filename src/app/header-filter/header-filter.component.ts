import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StateLocation } from '../business-domain/Business';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppStore } from '../app.store';
import { CategoryStore } from '../category-domain/category.store';
import { Category } from '../category-domain/category/Category';
import { CategoryListComponent } from "../category-domain/category-list/category-list.component";

@Component({
  selector: 'll-header-filter',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CategoryListComponent
  ],
  templateUrl: './header-filter.component.html',
  styleUrl: './header-filter.component.scss'
})
export class HeaderFilterComponent implements OnInit {
  readonly fb = inject(FormBuilder);
  readonly categoryStore = inject(CategoryStore);
  readonly appStore = inject(AppStore);
  readonly route = inject(ActivatedRoute);

  form = this.fb.group({
    stateLocation: this.fb.nonNullable.control<StateLocation>(this.appStore.stateSelected()),
    category: this.fb.nonNullable.control<Category>(this.categoryStore.categorySelected())
  });

  constructor() {

    //TODO we need these effects?
    // effect(() => {
    //   this.form.controls.category.setValue(this.categoryStore.categorySelected(), { emitEvent: false });
    // });

    // effect(() => {
    //   this.form.controls.stateLocation.setValue(this.appStore.stateSelected(), { emitEvent: false });
    // });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(async (paramMap) => {      
      const categoryId = paramMap.get('category');
      console.log('categoryId',categoryId);      
    });

    this.form.controls.category.valueChanges.subscribe((category) => {
      this.categoryStore.categorySelectedEvent(category);
    });

    this.form.controls.stateLocation.valueChanges.subscribe((state) => {
      //TODO could this be done without a form and in the template?
      this.appStore.stateLocationChange(state);
    });
  }
}




















//This for the query parm
      //TODO remove this until we actually use it or need it
      // this.route.queryParamMap.subscribe((query) => {
      //   const categoryId = query.get('category');
      //   console.log('query', categoryId)
      //   console.log(query.keys)
      //   if (categoryId) {
      //     this.categoryStore.filterByCategoryId(parseInt(categoryId));
      //   }
      // });