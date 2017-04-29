import { Component, OnInit } from '@angular/core';
import { Offer } from '../core/domain/offer';
import { Paginated } from '../core/common/paginated';
import { DataService } from '../core/services/data.service';
import { UtilityService } from '../core/services/utility.service';
import { NotificationService } from '../core/services/notification.service';
import { MembershipService } from '../core/services/membership.service';
import { OperationResult } from '../core/domain/operationResult';


@Component({
    selector: 'myoffers',
    templateUrl: './app/components/myoffers.component.html'
})
export class MyOffersComponent extends Paginated implements OnInit {
    private _offerAPI: string = 'api/offer/';
    private _offers: Array<Offer>;

    constructor(public offerService: DataService,
        public utilityService: UtilityService,
        public notificationService: NotificationService,
        public membershipService: MembershipService) {
        super(0, 0, 0);
    }

    ngOnInit() {
        this.offerService.set(this._offerAPI, 3);
        this.getAlbums();
    }

    delete(id: number) {
        var _removeResult: OperationResult = new OperationResult(false, '');

        this.notificationService.printConfirmationDialog('Na pewno chcesz usunąć ofertę?',
            () => {
                this.offerService.delete(id)
                    .subscribe(res => {
                        _removeResult.Succeeded = res.Succeeded;
                        _removeResult.Message = res.Message;
                    },
                    error => console.error('Error: ' + error),
                    () => {
                        if (_removeResult.Succeeded) {
                            this.notificationService.printSuccessMessage('Oferta pomyślnie usunięta!');
                            this.getAlbums();
                        }
                        else {
                            this.notificationService.printErrorMessage('Usuwanie zakończone niepowodzeniem!');
                        }
                    });
            });
    }

    isUserLoggedIn(): boolean {
        return this.membershipService.isUserAuthenticated();
    }

    getUserName(): string {
        if (this.isUserLoggedIn()) {
            var _user = this.membershipService.getLoggedInUser();
            return _user.Username;
        }
        else return null;
    }


    getAlbums(): void {
        this.offerService.getWithoutPages()
            .subscribe(res => {
                var data: any = res.json();
                var dataArray = new Array<Offer>();
                var filteredData = new Array<Offer>();
                dataArray = data;
                var username = this.getUserName();
                for (var i = 0; i < dataArray.length; i++) {
                    if (dataArray[i].Username == username) filteredData.push(dataArray[i]);
                }
                this._offers = filteredData;
                /*this._page = data.Page;
                this._pagesCount = data.TotalPages;
                this._totalCount = data.TotalCount;*/
                //debugger;
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
