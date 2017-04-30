import { Component, OnInit} from '@angular/core';
import { Offer } from '../core/domain/offer';
import { Paginated } from '../core/common/paginated';
import { DataService } from '../core/services/data.service';
import { UtilityService } from '../core/services/utility.service';
import { NotificationService } from '../core/services/notification.service';
import { MembershipService } from '../core/services/membership.service';

@Component({
    selector: 'home',
    templateUrl: './app/components/home.component.html',
    styles: ['app/components/home.css']
})
export class HomeComponent extends Paginated implements OnInit{
    private _offerAPI: string = 'api/offer/';
    private _offers: Array<Offer> = new Array;

    constructor(public membershipService: MembershipService,
        public offerService: DataService,
        public utilityService: UtilityService,
        public notificationService: NotificationService) {
        super(0, 0, 0);
    }

    ngOnInit() {
        this.offerService.set(this._offerAPI, 3);
        this.getAlbums();
    }

    getAlbums(): void {
        this.offerService.getWithoutPages()
            .subscribe(res => {
                var data: any = res.json();
                for (var _i = 0; _i < 4; _i++) {
                    this._offers[_i] = data[_i];
                }
                /*this._page = data.Page;
                this._pagesCount = data.TotalPages;
                this._totalCount = data.TotalCount;*/
                
            },
            error => {

                if (error.status == 401 || error.status == 404) {
                    this.notificationService.printErrorMessage('Authentication required');
                    this.utilityService.navigateToSignIn();
                }
            });
    }

    isUserLoggedIn(): boolean {
        return this.membershipService.isUserAuthenticated();
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}