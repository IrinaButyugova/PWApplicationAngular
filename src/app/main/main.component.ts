import { Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { DateHelperService } from '../services/date-helper.service';
import { MainService } from './main.service';
import { Paths } from '../paths';
import { Transaction } from './transaction';
import { UserInfo } from './user-info';
import { FilterModel } from './filter.model';

export type SortColumn = keyof Transaction;
export type SortDirection = 'asc' | 'desc';

@Component({
    selector: "main",
    templateUrl: "./main.component.html"
})

export class MainComponent implements OnInit {

    userInfo: UserInfo = new UserInfo("", "", "", 0);
    transactions: Array<Transaction> = new Array(); 
    errorMessages = new Array();
    filterModel: FilterModel = new FilterModel();

    sortColumn: SortColumn = 'date';
    sortDirection: SortDirection = 'desc';
    compare = (v1: string | number | Date, v2: string | number | Date) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

    constructor(
        private authService: AuthService,
        private mainService: MainService,
        private router: Router,
        private dateHelperService: DateHelperService) {}

    ngOnInit(){
        this.mainService.getUserInfo$()
        .pipe(catchError((err) => {
            this.errorMessages.push(err.error);
            throw err; 
        }))
        .subscribe((data: UserInfo) => {
            this.userInfo = data;
        });

        this.mainService.getTransations$()
        .pipe(catchError((err) => {
            this.errorMessages.push(err.error);
            throw err; 
        }))
        .subscribe((data: Array<Transaction>) => {
            data.forEach(a => a.date = this.dateHelperService.parseToDate(a.date.toString()));
            this.transactions = data;
            this.sort();
        });
    }

    public createTransaction() {
        this.router.navigateByUrl(`/${Paths.CreateTransaction}`)
    }

    public repeatTransaction(username: string, amount: number){
        if (amount < 0){
            amount = (-1) * amount;
        }
        this.router.navigateByUrl(`/${Paths.CreateTransaction}?name=${username}&amount=${amount}`)
    }

    public logout(): void {
        this.authService.logout$();
    }

    public sort(sortColumn?: SortColumn){
        if (sortColumn !== undefined){
            if(this.sortColumn !== sortColumn || this.sortDirection === 'desc'){
                this.sortDirection = 'asc';
                this.sortColumn = sortColumn;
            }
            else{
                this.sortDirection = 'desc'; 
            }
        }

        this.transactions = [...this.transactions].sort((a, b) => {
            const res = this.compare(a[this.sortColumn], b[this.sortColumn]);
            return this.sortDirection === 'asc' ? res : -res;
          });
    }

    public filter(){
        this.mainService.getTransations$()
        .pipe(catchError((err) => {
            this.errorMessages.push(err.error);
            throw err; 
        }))
        .subscribe((data: Array<Transaction>) => {
            data.forEach(a => a.date = this.dateHelperService.parseToDate(a.date.toString()));

            if(this.filterModel.startDate !== undefined && this.filterModel.startDate !== null){
                data = data.filter(a => {
                   return a.date >= this.filterModel.startDate!;
               });
            }
            if(this.filterModel.endDate !== undefined && this.filterModel.endDate !== null){
                data = data.filter(a => {
                    return a.date <= this.filterModel.endDate!;
                }) 
            }
            if(this.filterModel.name !== undefined && this.filterModel.name !== null &&
                this.filterModel.name != ""){
                    data = data.filter(a => {
                    return a.username.includes(this.filterModel.name!);
                }) 
            }
            if(this.filterModel.startAmount !== undefined && this.filterModel.startAmount !== null){
                data = data.filter(a => {
                    return a.amount >= this.filterModel.startAmount!;
                })  
            }
            if(this.filterModel.endAmount !== undefined && this.filterModel.endAmount !== null){
                data = data.filter(a => {
                    return a.amount <= this.filterModel.endAmount!;
                })  
            }
            this.transactions = data;
            this.sort();
        });
    }
}