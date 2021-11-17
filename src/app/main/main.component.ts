import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { MainService } from './main.service';
import { UserInfo } from './user-info';

@Component({
    selector: "main",
    templateUrl: "./main.component.html"
})

export class MainComponent implements OnInit {

    userInfo: UserInfo = new UserInfo("", "", "", 0);
    errorMessages = new Array();

    constructor(
        private authService: AuthService,
        private mainService: MainService) {}

    ngOnInit(){
        this.mainService.getUserInfo()
        .pipe(catchError((err) => {
            this.errorMessages.push(err.error);
            throw err; 
        }))
        .subscribe((data: UserInfo) => {
            this.userInfo = data;
        });
    }

    public logout(): void {
        this.authService.logout$();
    }
}