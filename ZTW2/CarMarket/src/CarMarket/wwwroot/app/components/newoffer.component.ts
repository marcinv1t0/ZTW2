import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '../core/domain/offer';
import { User } from '../core/domain/user';
import { OperationResult } from '../core/domain/operationResult';
import { DataService } from '../core/services/data.service';
import { OfferService } from '../core/services/offer.service';
import { UtilityService } from '../core/services/utility.service';
import { Paginated } from '../core/common/paginated';
import { NotificationService } from '../core/services/notification.service';
import { MembershipService } from '../core/services/membership.service';

@Component({
    selector: 'newoffer',
    providers: [OfferService, NotificationService],
    templateUrl: './app/components/newoffer.component.html',
    styles: ['app/components/newoffer.css']
})
export class NewOfferComponent implements OnInit {
    private _offersAPI: string = 'api/offer/';
    private _newOffer: Offer;
    private _user: User;
    private models = []; 
   // public fuels: Array<{ text: string }> = [{ text: "Benzyna" }, { text: "LPG" }]; 

    constructor(public offersService: OfferService,
        public utilityService: UtilityService,
        public notificationService: NotificationService,
        public membershipService: MembershipService) {

    }


    ngOnInit() {
        this._user = this.membershipService.getLoggedInUser();
        //var userId =
        var now = new Date();
        var end = new Date();
        end.setDate(now.getDate() + 7);
        //end.setDate(end.getDate() + 7);
            //this.photosService.set(this._photosAPI, 12);
            //this.getPhotos();
       //this.offersService.set(this._offersAPI);
        // this._newOffer = new Offer(null, 1, '', null, null, '', null, '', '', '', null, null, null, '', '', false, false, false, false, false, now, end, '', '', ''); 
        //this._newOffer = new Offer(null, this._user.Username, '', null, null, '', null, '', '', '', null, null, null, '', '', false, false, false, false, false, now, end, '', '', '');      
        this._newOffer = new Offer(this._user.Username, '', null, null, '', null, '', '', '', null, null, null, '', '', false, false, false, false, false, now, end, '', '', '');      

    }

    dropChange(val: any) {
        console.log(val);

        if (val == "Audi") {
            this.models = ["A3", "A4", "A8"];
        }
        else if (val == "BMW") {
            this.models = ["Seria 3", "Seria 5", "Seria 7"];
        }
        else if (val == "Mercedes") {
            this.models = ["W211", "W222", "W223"];
        }
        else if (val == "Aston Martin") {
            this.models = ["DB7", "DB8", "DB9"];
        } else if (val == "Porsche") {
            this.models = ["911", "Cayenne", "Panamera"];
        }
        else {
            this.models = [];
        }
    }


    submit(): void {
        debugger;
        
        var _registrationResult: OperationResult = new OperationResult(false, '');
        this.offersService.register(this._newOffer)
            .subscribe(res => {
                _registrationResult.Succeeded = res.Succeeded;
                _registrationResult.Message = res.Message;

            },
            error => console.error('Error: ' + error),
            () => {
                if (_registrationResult.Succeeded) {
                    this.notificationService.printSuccessMessage('Oferta dodana pomyślnie');
                    //this.router.navigate(['account/login']);
                }
                else {
                    this.notificationService.printErrorMessage(_registrationResult.Message);
                }
            });
    };

    isUserLoggedIn(): boolean {
        return this.membershipService.isUserAuthenticated();
    }

    getUserName(): string {
        if (this.isUserLoggedIn()) {
            this._user = this.membershipService.getLoggedInUser();
            return this._user.Username;
        }
    }

    /* onSelect(fuel): void {
        this._newOffer.Fuel = fuel;
    }
    */

   hack(val) {
        console.log('Before:');
        console.log(val);
        return val;
       
    }

    public makes = [
        { value: 'audi', display: 'Audi' },
        { value: 'aston', display: 'Aston Martin' },
        { value: 'bmw', display: 'BMW' },
        { value: 'mercedes', display: 'Mercedes' },
        { value: 'porsche', display: 'Porsche' }     
    ];
    
    public fuels = [
        { value: 'benzyna', display: 'Benzyna' },
        { value: 'benzynalpg', display: 'Benzyna + LPG' },
        { value: 'diesel', display: 'Diesel' },
        { value: 'elektryczny', display: 'Elektryczny' },
        { value: 'hybrydowy', display: 'hybrydowy' }
    ];

    public drives = [
        { value: 'fwd', display: 'Przedni' },
        { value: 'rwd', display: 'Tylny' },
        { value: 'awd', display: 'Na wszystkie koła' }
    ];

    public seats = [
        { value: '1', display: '1' },
        { value: '2', display: '2' },
        { value: '3', display: '3' },
        { value: '4', display: '4' },
        { value: '5', display: '5' },
        { value: '6', display: '6' },
        { value: '7', display: '7' }
    ];

    public doors = [
        { value: '3', display: '3' },
        { value: '5', display: '5' }
    ];

    public colors = [
        { value: 'niebieski', display: 'Niebieski' },
        { value: 'biały', display: 'Biały' },
        { value: 'czarny', display: 'Czarny' },
        { value: 'czerwony', display: 'Czerowny' },
        { value: 'granatowy', display: 'Granatowy' },
        { value: 'pomarańczowy', display: 'Pomarańczowy' },
        { value: 'srebrny', display: 'Srebrny' },
        { value: 'zielony', display: 'Zielony' },
        { value: 'żółty', display: 'Żółty' }
    ];

    public types = [
        { value: 'sedan/limuzyna', display: 'Sedan/Limuzyna' },
        { value: 'kombi', display: 'Kombi' },
        { value: 'coupe', display: 'Coupe' },
        { value: 'hatchback', display: 'Hatchback' },
        { value: 'kabriolet', display: 'Kabriolet' },
        { value: 'terenowy', display: 'Terenowy' },
        { value: 'VAN', display: 'VAN' },
        { value: 'SUV', display: 'SUV' }
    ];

    public gearboxes = [
        { value: 'manualna', display: 'Manualna' },
        { value: 'automatyczna', display: 'Automatyczna' }
    ];



}