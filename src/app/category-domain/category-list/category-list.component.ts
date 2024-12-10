import { Component, inject, OnInit } from '@angular/core';
import { BusinessStore } from '../../business-domain/business.store';
import { CategoryComponent } from "../category/category.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'll-category-list',
    imports: [
    CategoryComponent,
    MatButtonModule,
    MatIconModule
],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {  
  
  readonly store = inject(BusinessStore);
  ngOnInit(): void {

    // this.form.controls.location.valueChanges.subscribe((stateLocation) => {
    //   this.appStore.setState(stateLocation);
    //   this.router.navigate(['category-list', stateLocation.name]);
    // });

    // this.route.paramMap.subscribe((routeParms) => {

    //   if (this.appStore.isStatedSelectedInParm(routeParms)) {
    //     const stateSelected = this.appStore.stateSelected();
    //     this.store.loadAll(stateSelected).then(() => { });
    //     this.form.controls.location.setValue(stateSelected, { emitEvent: false });

    //   }
    //   else {
    //     this.router.navigate(['category-list', this.appStore.stateSelected().name]);
    //   }
    // })
  }
}