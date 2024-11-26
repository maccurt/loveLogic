import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BusinessStore } from '../business-domain/business.store';
import { AppStore } from '../app.store';
import { Category, categroryListMock, stateListMock, StateLocation } from '../business-domain/Business';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatDialog,
  // MAT_DIALOG_DATA,
  // MatDialogTitle,
  // MatDialogContent,
} from '@angular/material/dialog';
import { StateListDialogComponent } from '../state-list-dialog/state-list-dialog.component';

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

  stateList = stateListMock;
  readonly fb = inject(FormBuilder);
  readonly store = inject(BusinessStore);
  readonly route = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog)

  form = this.fb.group({
    stateLocation: this.fb.nonNullable.control<StateLocation>(stateListMock[0]),
    category: this.fb.nonNullable.control<Category>(categroryListMock[0])
  })

  constructor() {

    effect(() => {
      this.form.controls.category.setValue(this.store.categorySelected(), { emitEvent: false });
    })

    effect(() => {
      this.form.controls.stateLocation.setValue(this.store.stateSelected(), { emitEvent: false });
    })

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap) => {
      const state = paramMap.get('state');

      if (state) {
        this.store.loadAllByStateName(state);
      }
      else {
        this.store.loadAll(stateListMock[0])
      }
    })

    this.form.controls.category.valueChanges.subscribe((category) => {
      this.store.filter(category);
    });

    this.form.controls.stateLocation.valueChanges.subscribe((state) => {
      this.store.loadAll(state)
    });

  }

  chooseStateClick():void{
        this.dialog.open(StateListDialogComponent,{
          
          position:{
          
          }
        })
  }
}
