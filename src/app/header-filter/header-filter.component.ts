import { Component, effect, inject, OnInit } from '@angular/core';
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

    effect(() => {
      this.form.controls.category.setValue(this.categoryStore.categorySelected(), { emitEvent: false });
    });

    effect(() => {
      this.form.controls.stateLocation.setValue(this.appStore.stateSelected(), { emitEvent: false });
    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(async (paramMap) => {
      const state = paramMap.get('state');

      const id = paramMap.get('businessId');
      let businessId = -1;

      if (id && parseInt(id) > 0) {
        businessId = parseInt(id);
      }


      //TODO remove this or find a better way
      this.route.queryParamMap.subscribe((query) => {
        const categoryId = query.get('category');
        if (categoryId) {
          this.categoryStore.filterByCategoryId(parseInt(categoryId));
        }
      });
    });

    this.form.controls.category.valueChanges.subscribe((category) => {
      this.categoryStore.categorySelectedEvent(category);
    });

    this.form.controls.stateLocation.valueChanges.subscribe((state) => {
      //TODO we do not want the business store in here remove it
      //this.businessStore.loadAll(state);
    });
  }
}
