import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryStore } from '../category.store';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'll-category-list',
  imports: [    
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {  
  readonly categoryStore = inject(CategoryStore);
}