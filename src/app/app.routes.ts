import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoryListComponent } from './category-domain/category-list/category-list.component';
import { LocationListComponent } from './location-list/location-list.component';

export const routes: Routes = [

    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: HomePageComponent },
    { path: ':state', component: HomePageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'home/:state', component: HomePageComponent },
    { path: 'state-list', component: LocationListComponent },
    { path: 'category-list/:state', component: CategoryListComponent },
    { path: 'category-list', component: CategoryListComponent },
    { path: ':state', component: HomePageComponent },
    { path: ':state/:category', component: HomePageComponent },    
    { path: '**', redirectTo: 'home', pathMatch: 'full' }

];
