import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { stateListMock } from '../business-domain/Business';
import { categroryListMock, safetyBulletpointList as safetyBulletpointListMock } from "../business-domain/categroryListMock";
import { BusinessStore } from '../business-domain/business.store';
import { BusinessComponent } from '../business-domain/business/business.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderFilterComponent } from "../header-filter/header-filter.component";
import { CategoryComponent } from "../category-domain/category/category.component";
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule, Location } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { SafetyComponent } from "../safety/safety.component";

@Component({
  selector: 'll-home-page',
  imports: [
    CommonModule,
    ClipboardModule,
    BusinessComponent,
    ReactiveFormsModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatDividerModule,
    RouterModule,
    HeaderFilterComponent,
    CategoryComponent,
    SafetyComponent
],
  providers: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  
  readonly location = inject(Location);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly store = inject(BusinessStore);
  readonly fb = inject(FormBuilder);
  readonly categoryList = categroryListMock;
  readonly stateList = stateListMock;
  readonly form = this.fb.group({
    compactMode: this.fb.nonNullable.control<boolean>(true)
  });

  safetyBulletPoints = safetyBulletpointListMock;

  ngOnInit(): void {    
    this.form.controls.compactMode.valueChanges.subscribe((compactMode) => {
      this.store.compact(compactMode);
    });
  }

  hideBusiness() {
    this.store.showBusinessToggle(false);
  }
}