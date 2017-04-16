/// <reference path="../../typings/globals/es6-shim/index.d.ts" />

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import {enableProdMode} from '@angular/core';

enableProdMode();
import { MembershipService } from './core/services/membership.service';
import { User } from './core/domain/user';
import {TranslateService} from 'ng2-translate';


@Component({
    selector: 'CarMarket-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent implements OnInit {

    constructor(public membershipService: MembershipService,
        public location: Location, public translate: TranslateService) {
        translate.addLangs(["en", "pl"]);
        translate.setDefaultLang('en');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|pl/) ? browserLang : 'en');
    }

    ngOnInit() {}

    langOnClick() {
        
    }

    isUserLoggedIn(): boolean {
        return this.membershipService.isUserAuthenticated();
    }

    getUserName(): string {
        if (this.isUserLoggedIn()) {
            var _user = this.membershipService.getLoggedInUser();
            return _user.Username;
        }
        else
            return 'Logowanie';
    }

    logout(): void {
        this.membershipService.logout()
            .subscribe(res => {
                localStorage.removeItem('user');
            },
            error => console.error('Error: ' + error),
            () => { });
    }
}
