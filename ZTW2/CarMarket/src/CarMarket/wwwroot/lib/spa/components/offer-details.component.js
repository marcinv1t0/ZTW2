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
var router_1 = require("@angular/router");
var paginated_1 = require("../core/common/paginated");
var data_service_1 = require("../core/services/data.service");
var utility_service_1 = require("../core/services/utility.service");
var notification_service_1 = require("../core/services/notification.service");
var OfferDetailsComponent = (function (_super) {
    __extends(OfferDetailsComponent, _super);
    function OfferDetailsComponent(dataService, utilityService, notificationService, route, router) {
        var _this = _super.call(this, 0, 0, 0) || this;
        _this.dataService = dataService;
        _this.utilityService = utilityService;
        _this.notificationService = notificationService;
        _this.route = route;
        _this.router = router;
        _this._offerAPI = 'api/offer/';
        return _this;
    }
    OfferDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this._offerId = params['id']; // (+) converts string 'id' to a number
            _this._offerAPI += _this._offerId + '/offer/';
            _this.dataService.set(_this._offerAPI, 12);
            _this.getOffersDetails;
        });
    };
    OfferDetailsComponent.prototype.getOffersDetails = function () {
        var _this = this;
        this.dataService.getWithoutPages()
            .subscribe(function (res) {
            var data = res.json();
            _this._offer = data;
            /*this._page = data.Page;
            this._pagesCount = data.TotalPages;
            this._totalCount = data.TotalCount;*/
            debugger;
        }, function (error) {
            if (error.status == 401 || error.status == 302) {
                _this.utilityService.navigateToSignIn();
            }
            console.error('Error: ' + error);
        });
    };
    OfferDetailsComponent.prototype.convertDateTime = function (date) {
        return this.utilityService.convertDateTime(date);
    };
    return OfferDetailsComponent;
}(paginated_1.Paginated));
OfferDetailsComponent = __decorate([
    core_1.Component({
        selector: 'offer-details',
        providers: [notification_service_1.NotificationService],
        templateUrl: './app/components/offer-details.component.html'
    }),
    __metadata("design:paramtypes", [data_service_1.DataService,
        utility_service_1.UtilityService,
        notification_service_1.NotificationService,
        router_1.ActivatedRoute,
        router_1.Router])
], OfferDetailsComponent);
exports.OfferDetailsComponent = OfferDetailsComponent;
