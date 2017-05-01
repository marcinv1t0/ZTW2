"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var offer_1 = require("../core/domain/offer");
var operationResult_1 = require("../core/domain/operationResult");
var offer_service_1 = require("../core/services/offer.service");
var utility_service_1 = require("../core/services/utility.service");
var notification_service_1 = require("../core/services/notification.service");
var membership_service_1 = require("../core/services/membership.service");
var NewOfferComponent = (function () {
    // public fuels: Array<{ text: string }> = [{ text: "Benzyna" }, { text: "LPG" }]; 
    function NewOfferComponent(offersService, utilityService, notificationService, membershipService) {
        this.offersService = offersService;
        this.utilityService = utilityService;
        this.notificationService = notificationService;
        this.membershipService = membershipService;
        this._offersAPI = 'api/offer/';
        this.models = [];
        this.makes = [
            { value: 'audi', display: 'Audi' },
            { value: 'aston', display: 'Aston Martin' },
            { value: 'bmw', display: 'BMW' },
            { value: 'mercedes', display: 'Mercedes' },
            { value: 'porsche', display: 'Porsche' }
        ];
        this.fuels = [
            { value: 'benzyna', display: 'Benzyna' },
            { value: 'benzynalpg', display: 'Benzyna + LPG' },
            { value: 'diesel', display: 'Diesel' },
            { value: 'elektryczny', display: 'Elektryczny' },
            { value: 'hybrydowy', display: 'hybrydowy' }
        ];
        this.drives = [
            { value: 'fwd', display: 'Przedni' },
            { value: 'rwd', display: 'Tylny' },
            { value: 'awd', display: 'Na wszystkie koła' }
        ];
        this.seats = [
            { value: '1', display: '1' },
            { value: '2', display: '2' },
            { value: '3', display: '3' },
            { value: '4', display: '4' },
            { value: '5', display: '5' },
            { value: '6', display: '6' },
            { value: '7', display: '7' }
        ];
        this.doors = [
            { value: '3', display: '3' },
            { value: '5', display: '5' }
        ];
        this.colors = [
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
        this.types = [
            { value: 'sedan/limuzyna', display: 'Sedan/Limuzyna' },
            { value: 'kombi', display: 'Kombi' },
            { value: 'coupe', display: 'Coupe' },
            { value: 'hatchback', display: 'Hatchback' },
            { value: 'kabriolet', display: 'Kabriolet' },
            { value: 'terenowy', display: 'Terenowy' },
            { value: 'VAN', display: 'VAN' },
            { value: 'SUV', display: 'SUV' }
        ];
        this.gearboxes = [
            { value: 'manualna', display: 'Manualna' },
            { value: 'automatyczna', display: 'Automatyczna' }
        ];
    }
    NewOfferComponent.prototype.ngOnInit = function () {
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
        this._newOffer = new offer_1.Offer(this._user.Username, '', null, null, '', null, '', '', '', null, null, null, '', '', false, false, false, false, false, now, end, '', '', '');
    };
    NewOfferComponent.prototype.dropChange = function (val) {
        console.log(val);
        if (val == "Audi") {
            this.models = ["A3", "A4", "A8"];
        }
        else if (val == "BMW") {
            this.models = ["Seria 3", "Seria 5", "Seria 7"];
        }
        else if (val == "Mercedes") {
            this.models = ["W211", "W213", "W222"];
        }
        else if (val == "Aston Martin") {
            this.models = ["DB7", "DB8", "DB9"];
        }
        else if (val == "Porsche") {
            this.models = ["911", "Cayenne", "Panamera"];
        }
        else {
            this.models = [];
        }
    };
    NewOfferComponent.prototype.submit = function () {
        var _this = this;
        var _registrationResult = new operationResult_1.OperationResult(false, '');
        this._newOffer.PhotoUri = this._newOffer.Model;
        this.offersService.register(this._newOffer)
            .subscribe(function (res) {
            _registrationResult.Succeeded = res.Succeeded;
            _registrationResult.Message = res.Message;
        }, function (error) { return console.error('Error: ' + error); }, function () {
            if (_registrationResult.Succeeded) {
                _this.notificationService.printSuccessMessage('Oferta dodana pomyślnie');
                //this.router.navigate(['account/login']);
            }
            else {
                _this.notificationService.printErrorMessage(_registrationResult.Message);
            }
        });
    };
    ;
    NewOfferComponent.prototype.isUserLoggedIn = function () {
        return this.membershipService.isUserAuthenticated();
    };
    NewOfferComponent.prototype.getUserName = function () {
        if (this.isUserLoggedIn()) {
            this._user = this.membershipService.getLoggedInUser();
            return this._user.Username;
        }
    };
    /* onSelect(fuel): void {
        this._newOffer.Fuel = fuel;
    }
    */
    NewOfferComponent.prototype.hack = function (val) {
        console.log('Before:');
        console.log(val);
        return val;
    };
    return NewOfferComponent;
}());
NewOfferComponent = __decorate([
    core_1.Component({
        selector: 'newoffer',
        providers: [offer_service_1.OfferService, notification_service_1.NotificationService],
        templateUrl: './app/components/newoffer.component.html',
        styles: ['app/components/newoffer.css']
    }),
    __metadata("design:paramtypes", [offer_service_1.OfferService,
        utility_service_1.UtilityService,
        notification_service_1.NotificationService,
        membership_service_1.MembershipService])
], NewOfferComponent);
exports.NewOfferComponent = NewOfferComponent;
