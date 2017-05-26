import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { NewOfferComponent } from './components/newoffer.component';
import {OffersComponent } from './components/offers.component';
import { StatisticsComponent } from './components/statistics.component';
import { OfferComponent } from './components/offer.component';
import { MyOffersComponent } from './components/myoffers.component';
import { UpdateOfferComponent } from './components/updateoffer.component'
import { AdminComponent } from './components/admin.component'

import { accountRoutes, accountRouting } from './components/account/routes';


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent  
    },
    {
        path: 'newoffer',
        component: NewOfferComponent
    },
    {
        path: 'offers',
        component: OffersComponent
    },
    {

        path: 'statistics',
        component: StatisticsComponent
    },
    {
        path: 'offer',
        component: OfferComponent
    },
    {
        path: 'offers/:id/offer',
        component: OfferComponent
    },
    {
        path: 'myoffers',
        component: MyOffersComponent
    },
    {
        path: 'myoffers/:id/offer',
        component: UpdateOfferComponent
    },
{
        path: 'admin',
        component: AdminComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
