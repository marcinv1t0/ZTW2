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
    public lineChartData: Array<any> = new Array<number>();
    public lineChartLabels: Array<any> = ['>1970', '1971-1980', '1981-1990', '1991-2000', '2001-2010', '>2011'];
    public lineChartType: string = 'line';
    public options: any = {
        responsive: true,
        maintainAspectRatio: false
    };
    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: '#a4add3',
            borderColor: '#224377',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }];

    public lineChartOptions: any = {
        legend: { display: false },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: { enabled: false }
    }

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
                var data1 = 0;
                var data2 = 0;
                var data3 = 0;
                var data4 = 0;
                var data5 = 0;
                var data6 = 0;

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
                    var y = this._offers[i].Year;
                    if (y <= 1970) data1++;
                    else if (y >= 1971 && y <= 1980) data2++;
                    else if (y >= 1981 && y <= 1990) data3++;
                    else if (y >= 1991 && y <= 2000) data4++;
                    else if (y >= 2001 && y <= 2010) data5++;
                    else data6++;

                }
                var tempdata = new Array<number>();
                for (var i = 0; i < this.doughnutChartLabels.length; i++) {
                    tempdata.push(this.makesMap.get(this.doughnutChartLabels[i]));
                }
                var tempLineData = new Array<number>();
                tempLineData.push(data1);
                tempLineData.push(data2);
                tempLineData.push(data3);
                tempLineData.push(data4);
                tempLineData.push(data5);
                tempLineData.push(data6);
                this.lineChartData = tempLineData;
                this.doughnutChartData = tempdata;
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