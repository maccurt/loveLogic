import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { BusinessStore } from './business-domain/business.store';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'll-root',
  standalone: true,
  imports: [RouterOutlet,
    MatCardModule, RouterModule],
  providers: [BusinessStore, Router],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {  
  router = inject(Router);
  route = inject(ActivatedRoute); 
}