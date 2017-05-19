"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var paginated_1 = require("../core/common/paginated");
var data_service_1 = require("../core/services/data.service");
var utility_service_1 = require("../core/services/utility.service");
var notification_service_1 = require("../core/services/notification.service");
var operationResult_1 = require("../core/domain/operationResult");
var membership_service_1 = require("../core/services/membership.service");
var OffersComponent = (function (_super) {
    __extends(OffersComponent, _super);
    function OffersComponent(membershipService, userService, offerService, utilityService, notificationService) {
        var _this = _super.call(this, 0, 0, 0) || this;
        _this.membershipService = membershipService;
        _this.userService = userService;
        _this.offerService = offerService;
        _this.utilityService = utilityService;
        _this.notificationService = notificationService;
        _this._offerAPI = 'api/offer/';
        _this._userAPI = 'api/user/';
        _this.makes = [
            { value: 'audi', display: 'Audi' },
            { value: 'aston', display: 'Aston Martin' },
            { value: 'bmw', display: 'BMW' },
            { value: 'mercedes', display: 'Mercedes' },
            { value: 'porsche', display: 'Porsche' }
        ];
        return _this;
    }
    OffersComponent.prototype.ngOnInit = function () {
        this.offerService.set(this._offerAPI, 3);
        this.getAlbums();
        this.userService.set(this._userAPI, 3);
        this._username = this.getUsername();
    };
    OffersComponent.prototype.hack = function (val) {
        console.log('Before:');
        console.log(val);
        return val;
    };
    OffersComponent.prototype.isUserLoggedIn = function () {
        return this.membershipService.isUserAuthenticated();
    };
    OffersComponent.prototype.getUsername = function () {
        if (this.isUserLoggedIn()) {
            var _user = this.membershipService.getLoggedInUser();
            return _user.Username;
        }
        else
            return "";
    };
    OffersComponent.prototype.isAdmin = function () {
        if (this.isUserLoggedIn()) {
            var _user = this.membershipService.getLoggedInUser();
            if (_user.Role == "Admin") {
                return true;
            }
            else {
                return false;
            }
        }
        else
            return false;
    };
    OffersComponent.prototype.dropChange = function (val) {
        this._make = val;
    };
    OffersComponent.prototype.filter = function () {
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
        this._offersFiltered = new Array();
        for (var i = 0; i < this._offers.length; i++) {
            if (this._offers[i].Year <= this._filterYearTo && this._offers[i].Year >= this._filterYearFrom && this._offers[i].Price <= this._filterPriceTo && this._offers[i].Price >= this._filterPriceFrom) {
                if (this._make == null || this._offers[i].Make == this._make) {
                    this._offersFiltered.push(this._offers[i]);
                }
            }
        }
        if (fpfnull)
            this._filterPriceFrom = null;
        if (fptnull)
            this._filterPriceTo = null;
        if (fyfnull)
            this._filterYearFrom = null;
        if (fytnull)
            this._filterYearTo = null;
    };
    OffersComponent.prototype.delete = function (id) {
        var _this = this;
        var _removeResult = new operationResult_1.OperationResult(false, '');
        this.notificationService.printConfirmationDialog('Na pewno chcesz usunąć ofertę?', function () {
            debugger;
            _this.offerService.delete(id)
                .subscribe(function (res) {
                _removeResult.Succeeded = res.Succeeded;
                _removeResult.Message = res.Message;
            }, function (error) { return console.error('Error: ' + error); }, function () {
                if (_removeResult.Succeeded) {
                    _this.notificationService.printSuccessMessage('Oferta pomyślnie usunięta!');
                    _this.getAlbums();
                }
                else {
                    _this.notificationService.printErrorMessage('Usuwanie zakończone niepowodzeniem!');
                }
            });
        });
    };
    OffersComponent.prototype.getAlbums = function () {
        var _this = this;
        this.offerService.getWithoutPages()
            .subscribe(function (res) {
            var data = res.json();
            _this._offers = data;
            _this._offersFiltered = data;
        }, function (error) {
            if (error.status == 401 || error.status == 404) {
                _this.notificationService.printErrorMessage('Authentication required');
                _this.utilityService.navigateToSignIn();
            }
        });
    };
    OffersComponent.prototype.convertDateTime = function (date) {
        return this.utilityService.convertDateTime(date);
    };
    return OffersComponent;
}(paginated_1.Paginated));
OffersComponent = __decorate([
    core_1.Component({
        selector: 'offers',
        templateUrl: './app/components/offers.component.html'
    }),
    __metadata("design:paramtypes", [membership_service_1.MembershipService,
        data_service_1.DataService,
        data_service_1.DataService,
        utility_service_1.UtilityService,
        notification_service_1.NotificationService])
], OffersComponent);
exports.OffersComponent = OffersComponent;
