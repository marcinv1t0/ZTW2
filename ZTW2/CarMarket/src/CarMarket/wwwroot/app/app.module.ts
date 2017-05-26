import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Headers, RequestOptions, BaseRequestOptions} from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate';

import { AccountModule } from './components/account/account.module';
import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home.component';
import { NewOfferComponent } from './components/newoffer.component';
import { OffersComponent } from './components/offers.component';
import { OfferComponent } from './components/offer.component';
import { StatisticsComponent } from './components/statistics.component';
import { MyOffersComponent } from './components/myoffers.component';
import { UpdateOfferComponent } from './components/updateoffer.component';
import { AdminComponent } from './components/admin.component';
import { routing } from './routes';

import { DataService } from './core/services/data.service';
import { MembershipService } from './core/services/membership.service';
import { UtilityService } from './core/services/utility.service';
import { NotificationService } from './core/services/notification.service';
import { OfferService } from './core/services/offer.service';

class AppBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers();

    constructor() {
        super();
        this.headers.append('Content-Type', 'application/json');
        this.body = '';
    }
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        AccountModule,
        ChartsModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
            deps: [Http]
        })
    ],
    declarations: [AppComponent,  HomeComponent, UpdateOfferComponent, MyOffersComponent, StatisticsComponent, NewOfferComponent, OffersComponent, OfferComponent, AdminComponent],
    providers: [DataService, OfferService, MembershipService, UtilityService, NotificationService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: RequestOptions, useClass: AppBaseRequestOptions }],
    bootstrap: [AppComponent]
})
export class AppModule { }

