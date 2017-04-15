import { Component, OnInit } from '@angular/core';
import { Offer } from '../core/domain/offer';
import { Paginated } from '../core/common/paginated';
import { DataService } from '../core/services/data.service';
import { UtilityService } from '../core/services/utility.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
    selector: 'statistics',
    templateUrl: './app/components/statistics.component.html'
})
export class StatisticsComponent extends Paginated implements OnInit {
    private _offerAPI: string = 'api/offer/';
    public doughnutChartLabels: string[] = new Array<string>();
    public doughnutChartData: number[] = new Array<number>();
    private doughnutChartColors: any[] = [{ backgroundColor: ["#b8436d", "#00d9f9", "#a4c73c", "#a4add3", "#224377"] }];
    public doughnutChartType: string = 'doughnut';
    private _offers: Array<Offer>;
    public makesMap: Map<string, number> = new Map<string, number>();


    constructor(public offerService: DataService,
        public utilityService: UtilityService,
        public notificationService: NotificationService) {
        super(0, 0, 0);
    }
    ngOnInit() {
        this.offerService.set(this._offerAPI, 3);
        this.getAlbums();
    }

    getAlbums(): void {
        this.offerService.getWithoutPages()
            .subscribe(res => {
                var data: any = res.json();
                /*for (var _i = 0; _i < 4; _i++) {
                    this._offers[_i] = data[_i];
                }*/
                this._offers = data;

                for (var i = 0; i < this._offers.length; i++) {
                    if (this.makesMap.has(this._offers[i].Make)) {
                        var temp = this.makesMap.get(this._offers[i].Make);
                        temp += 1;
                        this.makesMap.delete(this._offers[i].Make);
                        this.makesMap.set(this._offers[i].Make, temp);

                    }
                    else {
                        this.makesMap.set(this._offers[i].Make, 1);
                        this.doughnutChartLabels.push(this._offers[i].Make);
                    }

                }
                for (var i = 0; i < this.doughnutChartLabels.length; i++) {
                    this.doughnutChartData.push(this.makesMap.get(this.doughnutChartLabels[i]));
                }
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

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}