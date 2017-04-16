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
var StatisticsComponent = (function (_super) {
    __extends(StatisticsComponent, _super);
    function StatisticsComponent(offerService, utilityService, notificationService) {
        var _this = _super.call(this, 0, 0, 0) || this;
        _this.offerService = offerService;
        _this.utilityService = utilityService;
        _this.notificationService = notificationService;
        _this._offerAPI = 'api/offer/';
        _this.doughnutChartLabels = new Array();
        _this.doughnutChartData = new Array();
        _this.doughnutChartColors = [{ backgroundColor: ["#b8436d", "#00d9f9", "#a4c73c", "#a4add3", "#224377"] }];
        _this.doughnutChartType = 'doughnut';
        _this.makesMap = new Map();
        return _this;
    }
    StatisticsComponent.prototype.ngOnInit = function () {
        this.offerService.set(this._offerAPI, 3);
        this.getAlbums();
    };
    StatisticsComponent.prototype.getAlbums = function () {
        var _this = this;
        this.offerService.getWithoutPages()
            .subscribe(function (res) {
            var data = res.json();
            /*for (var _i = 0; _i < 4; _i++) {
                this._offers[_i] = data[_i];
            }*/
            _this._offers = data;
            for (var i = 0; i < _this._offers.length; i++) {
                if (_this.makesMap.has(_this._offers[i].Make)) {
                    var temp = _this.makesMap.get(_this._offers[i].Make);
                    temp += 1;
                    _this.makesMap.delete(_this._offers[i].Make);
                    _this.makesMap.set(_this._offers[i].Make, temp);
                }
                else {
                    _this.makesMap.set(_this._offers[i].Make, 1);
                    _this.doughnutChartLabels.push(_this._offers[i].Make);
                }
            }
            for (var i = 0; i < _this.doughnutChartLabels.length; i++) {
                _this.doughnutChartData.push(_this.makesMap.get(_this.doughnutChartLabels[i]));
            }
            /*this._page = data.Page;
            this._pagesCount = data.TotalPages;
            this._totalCount = data.TotalCount;*/
        }, function (error) {
            if (error.status == 401 || error.status == 404) {
                _this.notificationService.printErrorMessage('Authentication required');
                _this.utilityService.navigateToSignIn();
            }
        });
    };
    // events
    StatisticsComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    StatisticsComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    return StatisticsComponent;
}(paginated_1.Paginated));
StatisticsComponent = __decorate([
    core_1.Component({
        selector: 'statistics',
        templateUrl: './app/components/statistics.component.html'
    }),
    __metadata("design:paramtypes", [data_service_1.DataService,
        utility_service_1.UtilityService,
        notification_service_1.NotificationService])
], StatisticsComponent);
exports.StatisticsComponent = StatisticsComponent;
