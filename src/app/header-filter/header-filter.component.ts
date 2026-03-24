import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BusinessStore } from '../business-domain/business.store';
import { StateLocation } from '../business-domain/Business';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatDialog,
} from '@angular/material/dialog';
import { AppStore } from '../app.store';
import { CategoryStore } from '../category-domain/category.store';
import { Category } from '../category-domain/category/Category';

@Component({
  selector: 'll-header-filter',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './header-filter.component.html',
  styleUrl: './header-filter.component.scss'

})
export class HeaderFilterComponent implements OnInit {
  readonly fb = inject(FormBuilder);
  //TODO remove business store from here and use app or category
  readonly businessStore = inject(BusinessStore);
  readonly categoryStore = inject(CategoryStore);
  readonly appStore = inject(AppStore);
  readonly route = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);

  form = this.fb.group({
    stateLocation: this.fb.nonNullable.control<StateLocation>(this.businessStore.stateSelected()),
    category: this.fb.nonNullable.control<Category>(this.categoryStore.categorySelected())
  });

  constructor() {

    effect(() => {
      this.form.controls.category.setValue(this.categoryStore.categorySelected(), { emitEvent: false });
    });

    effect(() => {
      this.form.controls.stateLocation.setValue(this.businessStore.stateSelected(), { emitEvent: false });
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

      if (state) {
        await this.businessStore.loadAllByStateName(state, businessId);
      }
      else {
        await this.businessStore.loadAll(this.businessStore.stateSelected());
      }

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
      this.businessStore.loadAll(state);
    });
  }
}
