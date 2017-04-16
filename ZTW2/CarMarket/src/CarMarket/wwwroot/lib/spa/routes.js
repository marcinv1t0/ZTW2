"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./components/home.component");
var photos_component_1 = require("./components/photos.component");
var albums_component_1 = require("./components/albums.component");
var album_photos_component_1 = require("./components/album-photos.component");
var newoffer_component_1 = require("./components/newoffer.component");
var offers_component_1 = require("./components/offers.component");
var statistics_component_1 = require("./components/statistics.component");
var offer_component_1 = require("./components/offer.component");
var appRoutes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    {
        path: 'photos',
        component: photos_component_1.PhotosComponent
    },
    {
        path: 'albums',
        component: albums_component_1.AlbumsComponent
    },
    {
        path: 'albums/:id/photos',
        component: album_photos_component_1.AlbumPhotosComponent
    },
    {
        path: 'newoffer',
        component: newoffer_component_1.NewOfferComponent
    },
    {
        path: 'offers',
        component: offers_component_1.OffersComponent
    },
    {
        path: 'statistics',
        component: statistics_component_1.StatisticsComponent
    },
    {
        path: 'offer',
        component: offer_component_1.OfferComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
