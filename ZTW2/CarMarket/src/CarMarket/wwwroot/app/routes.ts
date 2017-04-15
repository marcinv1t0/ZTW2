import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { PhotosComponent } from './components/photos.component';
import { AlbumsComponent } from './components/albums.component';
import { AlbumPhotosComponent } from './components/album-photos.component';
import { NewOfferComponent } from './components/newoffer.component';
import {OffersComponent } from './components/offers.component';
import { StatisticsComponent } from './components/statistics.component';
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
        path: 'photos',
        component: PhotosComponent
    },
    {
        path: 'albums',
        component: AlbumsComponent
    },
    {
        path: 'albums/:id/photos',
        component: AlbumPhotosComponent
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
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
