import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { BusinessStore } from './business-domain/business.store';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'll-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatCardModule,
    RouterModule],
  //Why do you provide the business store, what makes it global
  providers: [Router],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  store = inject(BusinessStore);
}