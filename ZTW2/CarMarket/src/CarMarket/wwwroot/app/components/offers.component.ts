import { Component, OnInit} from '@angular/core';
import { Offer } from '../core/domain/offer';
import { Paginated } from '../core/common/paginated';
import { DataService } from '../core/services/data.service';
import { UtilityService } from '../core/services/utility.service';
import { NotificationService } from '../core/services/notification.service';
import { OperationResult } from '../core/domain/operationResult';


@Component({
    selector: 'offers',
    templateUrl: './app/components/offers.component.html'
})
export class OffersComponent extends Paginated implements OnInit {
    private _offerAPI: string = 'api/offer/';
    private _offers: Array<Offer>;

    constructor(public offerService: DataService,
        public utilityService: UtilityService,
        public notificationService: NotificationService) {
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

    getAlbums(): void {
        this.offerService.getWithoutPages()
            .subscribe(res => {
                var data: any = res.json();
                this._offers = data;
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

   