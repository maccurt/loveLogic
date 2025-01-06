import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoryListComponent } from './category-domain/category-list/category-list.component';
import { LocationListComponent } from './location-list/location-list.component';
import { TestComponent } from './test/test.component';
import { MarketingComponent } from './marketing-domain/marketing/marketing.component';

export const routes: Routes = [

    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: HomePageComponent },
    { path: 'test', component: TestComponent },
    { path: 'about-us', component: MarketingComponent },
    { path: 'marketing', component: MarketingComponent },
    { path: ':state', component: HomePageComponent },
    { path: ':state/:businessId', component: HomePageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'home/:state', component: HomePageComponent },
    { path: 'state/:state/business/:businessId', component: HomePageComponent },
    { path: ':state/:businessId', component: HomePageComponent },
    { path: 'state-list', component: LocationListComponent },
    { path: 'category-list/:state', component: CategoryListComponent },
    { path: 'category-list', component: CategoryListComponent },
    { path: ':state', component: HomePageComponent },
    { path: ':state/:category', component: HomePageComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
