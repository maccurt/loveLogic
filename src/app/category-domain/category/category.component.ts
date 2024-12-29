import { Component, inject, input } from '@angular/core';
import { Category } from "../../business-domain/categroryListMock";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BusinessStore } from '../../business-domain/business.store';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'll-category',
    imports: [MatCardModule, MatIconModule, RouterModule,TitleCasePipe],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss'
})
export class CategoryComponent {

  store = inject(BusinessStore);
  category = input.required<Category>();

}
