import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BusinessStore } from '../business-domain/business.store';
import { StateLocation } from '../business-domain/Business';
import { Category } from "../business-domain/categroryListMock";
import { categroryListMock } from "../business-domain/categroryListMock";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatDialog,  
} from '@angular/material/dialog';

@Component({
  selector: 'll-header-filter',
  standalone: true,
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
  readonly store = inject(BusinessStore);
  readonly route = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);

  form = this.fb.group({
    stateLocation: this.fb.nonNullable.control<StateLocation>(this.store.stateSelected()),
    category: this.fb.nonNullable.control<Category>(categroryListMock[0])
  });

  constructor() {

    effect(() => {
      this.form.controls.category.setValue(this.store.categorySelected(), { emitEvent: false });
    });

    effect(() => {
      this.form.controls.stateLocation.setValue(this.store.stateSelected(), { emitEvent: false });
    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(async (paramMap) => {
      const state = paramMap.get('state');

      if (state) {
        await this.store.loadAllByStateName(state);
      }
      else {
       await  this.store.loadAll(this.store.stateSelected());
      }

      this.route.queryParamMap.subscribe((query) => {
        const categoryId = query.get('category');
        if (categoryId) {
          this.store.filterByCategoryId(parseInt(categoryId));
        }
      });

    });

    this.form.controls.category.valueChanges.subscribe((category) => {
      this.store.filter(category);
    });

    this.form.controls.stateLocation.valueChanges.subscribe((state) => {
      this.store.loadAll(state);
    });
  }  
}
