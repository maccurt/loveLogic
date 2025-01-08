import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { stateListMock } from '../business-domain/Business';
import { categroryListMock, safetyBulletpointList_Mock as SafetyBulletpointList_Mock } from "../business-domain/categroryListMock";
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
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule, Location } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MarketingComponent } from '../marketing-domain/marketing/marketing.component';
import { SafetyMarketing_MOCK } from '../marketing-domain/Marketing';
import { MarketingService } from '../marketing-domain/marketing.service';
import { InviteComponent } from "../invite/invite.component";

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
    MatBottomSheetModule,
    RouterModule,
    HeaderFilterComponent,
    MarketingComponent,
    InviteComponent
],
  providers: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  readonly marketingService = inject(MarketingService);
  readonly store = inject(BusinessStore);
  readonly location = inject(Location);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly fb = inject(FormBuilder);
  readonly categoryList = categroryListMock;
  readonly stateList = stateListMock;
  readonly form = this.fb.group({
    compactMode: this.fb.nonNullable.control<boolean>(true)
  });

  safetyBulletPoints = SafetyBulletpointList_Mock;

  safetyIsAPriority = SafetyMarketing_MOCK;

  ngOnInit(): void {
    this.form.controls.compactMode.valueChanges.subscribe((compactMode) => {
      this.store.compact(compactMode);
    });
  }

}