﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { User } from '../core/domain/user';
import { Paginated } from '../core/common/paginated';
import { DataService } from '../core/services/data.service';
import { UtilityService } from '../core/services/utility.service';
import { NotificationService } from '../core/services/notification.service';
import { Subscription }  from 'rxjs/Subscription';


@Component({
    selector: 'admin',
    templateUrl: './app/components/admin.component.html'
})
export class AdminComponent extends Paginated implements OnInit {
    private _users: Array<User>;
    private _userAPI: string = 'api/user/';

    constructor(public userService: DataService,
        public utilityService: UtilityService,
        public notificationService: NotificationService, private route: ActivatedRoute,
                private router: Router) {
        super(0, 0, 0);
    }

    ngOnInit() {     
        this.userService.set(this._userAPI, 3);
        this.getUsers();      
    }

    getUsers(): void {
        this.userService.getWithoutPages()
            .subscribe(res => {
                var data: any = res.json();
                this._users = data;    
                           
            },
            error => {

                if (error.status == 401 || error.status == 404) {
                    this.notificationService.printErrorMessage('Authentication required');
                    this.utilityService.navigateToSignIn();
                }
            });
    }
   
    
}

