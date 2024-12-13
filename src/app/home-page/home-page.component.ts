import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { stateListMock } from '../business-domain/Business';
import { categroryListMock } from "../business-domain/categroryListMock";
import { BusinessStore } from '../business-domain/business.store';
import { BusinessComponent } from '../business-domain/business/business.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppStore } from '../app.store';
import { HeaderFilterComponent } from "../header-filter/header-filter.component";
import { CategoryComponent } from "../category-domain/category/category.component";
@Component({
  selector: 'll-home-page',
  imports: [
    BusinessComponent,
    ReactiveFormsModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterModule,
    HeaderFilterComponent,
    CategoryComponent
  ],
  providers: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly store = inject(BusinessStore);
  readonly appStore = inject(AppStore);
  readonly fb = inject(FormBuilder);
  readonly categoryList = categroryListMock;
  readonly stateList = stateListMock;
  readonly form = this.fb.group({
    compactMode: this.fb.nonNullable.control<boolean>(true)
  });

  ngOnInit(): void {
    this.form.controls.compactMode.valueChanges.subscribe((compactMode) => {
      this.store.compact(compactMode);
    });
  }
}