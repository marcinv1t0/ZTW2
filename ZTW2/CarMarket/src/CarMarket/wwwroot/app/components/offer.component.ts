import { Component, OnInit } from '@angular/core';
import { Offer } from '../core/domain/offer';
import { Paginated } from '../core/common/paginated';
import { DataService } from '../core/services/data.service';
import { UtilityService } from '../core/services/utility.service';
import { NotificationService } from '../core/services/notification.service';


@Component({
    selector: 'offer',
    templateUrl: './app/components/offer.component.html'
})
export class OfferComponent extends Paginated implements OnInit {
    private _offerAPI: string = 'api/offer/';
    private _offer: Offer;

    constructor(public offerService: DataService,
        public utilityService: UtilityService,
        public notificationService: NotificationService) {
        super(0, 0, 0);
    }

    ngOnInit() {
        this.offerService.set(this._offerAPI, 3);
        this.getOffer(6);
    }

    hack(val) {
        console.log('Before:');
        console.log(val);
        return val;

    }

    getOffer(id: number): void {
        this.offerService.getById(id)
            .subscribe(res => {
                var data: any = res.json();
                this._offer = data;
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

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}

