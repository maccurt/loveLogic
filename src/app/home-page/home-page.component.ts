import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { stateListMock } from '../business-domain/Business';
import { categroryListMock } from "../business-domain/categroryListMock";
import { BusinessStore } from '../business-domain/business.store';
import { BusinessComponent } from '../business-domain/business/business.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SafetyComponent } from "../safety/safety.component";
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppStore } from '../app.store';
import { HeaderFilterComponent } from "../header-filter/header-filter.component";
import { CategoryListComponent } from "../category-domain/category-list/category-list.component";

@Component({
  selector: 'll-home-page',
  standalone: true,
  imports: [
    BusinessComponent,
    ReactiveFormsModule,
    SafetyComponent,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterModule,
    HeaderFilterComponent,
    CategoryListComponent
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









































// //When the category change we have to update the store to set the filteres list
// this.form.controls.categoryId.valueChanges.subscribe((categoryId) => {
//   this.store.filter(categoryId);
// });

//We we change the Location state (Nebraska, GA)
// this.form.controls.location.valueChanges.subscribe((locationState) => {
//   this.appStore.setState(locationState) //TODO why have 2 stores, is it valuable
//   this.router.navigate(['', locationState.name]);
// });

//This seems complicated. Can we simplify
// this.route.paramMap.subscribe((routeParms) => {

//   if (this.appStore.isStatedSelectedInParm(routeParms)) {

//     this.store.loadAll(this.appStore.stateSelected()).then(() => {

//       //Can we remove this to a method what is this doing?
//       let categoryId = 0;
//       const categoryParm = routeParms.get('category');
//       if (categoryParm !== null) {
//         categoryId = + categoryParm;
//         let cat = this.store.categoryList().find((c) => { return c.id === categoryId });
//         if (!cat) { categoryId = 0 };
//         this.form.controls.categoryId.setValue(categoryId);
//       }
//     });

//     this.form.controls.location.setValue(this.appStore.stateSelected(), { emitEvent: false });

//   }
//   else {
//     this.appStore.setState(this.stateList[0])
//     this.router.navigate(['', this.stateList[0].name]);
//   }

// });