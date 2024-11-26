import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { BusinessComponent } from './business-domain/business/business.component';
import { BusinessStore } from './business-domain/business.store';
import { MatCardModule } from '@angular/material/card';
import { AppStore } from './app.store';
import { filter } from 'rxjs';
import { HeaderFilterComponent } from "./header-filter/header-filter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BusinessComponent,
    MatCardModule, RouterModule, HeaderFilterComponent],
  providers: [BusinessStore, Router],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  // appStore = inject(AppStore);
  router = inject(Router)
  route = inject(ActivatedRoute)

  constructor() {
    
  }
}