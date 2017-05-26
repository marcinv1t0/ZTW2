"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./components/home.component");
var newoffer_component_1 = require("./components/newoffer.component");
var offers_component_1 = require("./components/offers.component");
var statistics_component_1 = require("./components/statistics.component");
var offer_component_1 = require("./components/offer.component");
var myoffers_component_1 = require("./components/myoffers.component");
var updateoffer_component_1 = require("./components/updateoffer.component");
var admin_component_1 = require("./components/admin.component");
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
    },
    {
        path: 'offers/:id/offer',
        component: offer_component_1.OfferComponent
    },
    {
        path: 'myoffers',
        component: myoffers_component_1.MyOffersComponent
    },
    {
        path: 'myoffers/:id/offer',
        component: updateoffer_component_1.UpdateOfferComponent
    },
    {
        path: 'admin',
        component: admin_component_1.AdminComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
