import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/domain/user';
import { Role } from '../../core/domain/role';
import { OperationResult } from '../../core/domain/operationResult';
import { MembershipService } from '../../core/services/membership.service';
import { NotificationService } from '../../core/services/notification.service';
import { DataService } from '../../core/services/data.service';
import { UtilityService } from '../../core/services/utility.service';

@Component({
    selector: 'albums',
    templateUrl: './app/components/account/login.component.html'
})
export class LoginComponent implements OnInit {
    private _user: User;
    private _userAPI: string = 'api/user/';
    private _roleName: string;

    constructor(public userService: DataService, public membershipService: MembershipService,
                public utilityService: UtilityService,
                public notificationService: NotificationService,
                public router: Router) { }

    ngOnInit() {
        this._user = new User(0, '', '', '');
        this.userService.set(this._userAPI, 3);
    }

    getUserRole(name: string): void {
        var data: any;
        this.userService.getByUsername(name)
            .subscribe(res => {
                data = res.json();
                this._user.Role = data.Name;  
                this.authenticate();          
               
            },
            error => {

                if (error.status == 401 || error.status == 404) {
                    this.notificationService.printErrorMessage('Authentication required');
                    this.utilityService.navigateToSignIn();
                }
            });
        
    }

    login(): void {
        this.getUserRole(this._user.Username);    
        
    }

    authenticate(): void {
        
        var _authenticationResult: OperationResult = new OperationResult(false, '');
        debugger;
        this.membershipService.login(this._user)
            .subscribe(res => {
                _authenticationResult.Succeeded = res.Succeeded;
                _authenticationResult.Message = res.Message;
            },
            error => console.error('Error: ' + error),
            () => {
                if (_authenticationResult.Succeeded) {
                    this.notificationService.printSuccessMessage('Witaj ponownie ' + this._user.Username + '!');
                    localStorage.setItem('user', JSON.stringify(this._user));
                    this.router.navigate(['home']);
                }
                else {
                    this.notificationService.printErrorMessage(_authenticationResult.Message);
                }
            }); 
        
        
        
    };
}