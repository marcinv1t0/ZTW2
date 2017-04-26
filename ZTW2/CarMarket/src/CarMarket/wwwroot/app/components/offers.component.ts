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
    private _offersFiltered: Array<Offer>;
    public _filterYearFrom: number;
    public _filterYearTo: number;
    public _filterPriceFrom: number;
    public _filterPriceTo: number;
    public _make: string;

    constructor(public offerService: DataService,
        public utilityService: UtilityService,
        public notificationService: NotificationService) {
        super(0, 0, 0);
    }

    ngOnInit() {
        this.offerService.set(this._offerAPI, 3);
        this.getAlbums();
    }

    dropChange(val: any) {
        this._make = val;
    }

    filter() {
        debugger;
        var fpfnull = false;
        if (this._filterPriceFrom == null) {
            this._filterPriceFrom = 0;
            fpfnull = true;
        }
        var fptnull = false;
        if (this._filterPriceTo == null) {
            this._filterPriceTo = Number.MAX_SAFE_INTEGER;
            fptnull = true;
        }
        var fyfnull = false;
        if (this._filterYearFrom == null) {
            this._filterYearFrom = 0;
            fyfnull = true;
        }
        var fytnull = false;
        if (this._filterYearTo == null) {
            this._filterYearTo = Number.MAX_SAFE_INTEGER;
            fytnull = true;
        }
        this._offersFiltered = new Array<Offer>();
        for (var i = 0; i < this._offers.length; i++) {
            if (this._offers[i].Year <= this._filterYearTo && this._offers[i].Year >= this._filterYearFrom && this._offers[i].Price <= this._filterPriceTo && this._offers[i].Price >= this._filterPriceFrom) {
                if (this._make == null || this._offers[i].Make == this._make) {
                    this._offersFiltered.push(this._offers[i]);
                }
            }
        }
        if (fpfnull) this._filterPriceFrom = null;
        if (fptnull) this._filterPriceTo = null;
        if (fyfnull) this._filterYearFrom = null;
        if (fytnull) this._filterYearTo = null;
    }

    public makes = [
        { value: 'audi', display: 'Audi' },
        { value: 'aston', display: 'Aston Martin' },
        { value: 'bmw', display: 'BMW' },
        { value: 'mercedes', display: 'Mercedes' },
        { value: 'porsche', display: 'Porsche' }
    ];

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
                this._offersFiltered = data;
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

   