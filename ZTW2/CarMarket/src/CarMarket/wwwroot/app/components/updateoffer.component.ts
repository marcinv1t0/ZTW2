
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Offer } from '../core/domain/offer';
import { Paginated } from '../core/common/paginated';
import { DataService } from '../core/services/data.service';
import { UtilityService } from '../core/services/utility.service';
import { NotificationService } from '../core/services/notification.service';
import { OperationResult } from '../core/domain/operationResult';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'updateOffer',
    providers: [NotificationService],
    templateUrl: './app/components/updateoffer.component.html'
})
export class UpdateOfferComponent extends Paginated implements OnInit {
    private _offerAPI: string = 'api/offer/';
    private _offerId: string;
    private sub: Subscription;
    private _offer: Offer;


    constructor(public dataService: DataService,
        public utilityService: UtilityService,
        public notificationService: NotificationService,
        private route: ActivatedRoute,
        private router: Router) {
        super(0, 0, 0);
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this._offerId = params['id']; // (+) converts string 'id' to a number
            this._offerAPI += this._offerId;
            this.dataService.set(this._offerAPI, 12);
            this.getOffersDetails();
        });
    }

    save() {

    }

    getOffersDetails(): void {
        this.dataService.getWithoutPages()
            .subscribe(res => {
                var data: any = res.json();
                this._offer = data;
                /*this._page = data.Page;
                this._pagesCount = data.TotalPages;
                this._totalCount = data.TotalCount;*/
            },
            error => {

                if (error.status == 401 || error.status == 302) {
                    this.utilityService.navigateToSignIn();
                }

                console.error('Error: ' + error)
            });
    }


    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}