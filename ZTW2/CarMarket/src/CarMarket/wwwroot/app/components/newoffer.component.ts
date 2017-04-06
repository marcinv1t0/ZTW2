import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '../core/domain/offer';
import { OperationResult } from '../core/domain/operationResult';
import { DataService } from '../core/services/data.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
    selector: 'newoffer',
    providers: [DataService, NotificationService],
    templateUrl: './app/components/newoffer.component.html',
    styles: ['app/components/newoffer.css']
})
export class NewOfferComponent {

    constructor() {

    }
}