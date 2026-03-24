import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MarketingComponent } from './marketing-domain/marketing/marketing.component';

export const routes: Routes = [
    
    { path: '', component: HomePageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'about-us', component: MarketingComponent },    
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

//TODO remove this if you do not need. remove component, etc..
    // { path: 'home/:state', component: HomePageComponent },
    // { path: 'state/:state/business/:businessId', component: HomePageComponent },
    // { path: ':state/:businessId', component: HomePageComponent },
    // { path: 'state-list', component: LocationListComponent },
    // { path: 'category-list/:state', component: CategoryListComponent },
    // { path: 'category-list', component: CategoryListComponent },
    // { path: ':state', component: HomePageComponent },
    // { path: ':state/:category', component: HomePageComponent },
    // { path: '', redirectTo: 'home', pathMatch: 'full' },    
    // { path: 'test', component: TestComponent },    
    // { path: ':state', component: HomePageComponent },
    // { path: ':state/:businessId', component: HomePageComponent },
