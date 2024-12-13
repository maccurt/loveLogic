import { Component, inject } from '@angular/core';
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
export class CategoryListComponent {
  readonly store = inject(BusinessStore);
}