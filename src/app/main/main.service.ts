import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { CreateTransactionModel } from './create-transaction.model';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../services/storage-keys';
import { StorageService } from '../services/storage.service';
import { map, tap } from 'rxjs';
import { Transaction } from './transaction';
import { UserInfo } from './user-info';

@Injectable()
export class MainService {
    
    constructor(
        private http: HttpClient,
        private storageService: StorageService,
        private router: Router){}

    public getUserInfo$(){
        const httpHeaders = new HttpHeaders().set('Authorization', this.getTokenString());
        return this.http.get(`${environment.baseUrl}api/protected/user-info`,
        {headers: httpHeaders})
        .pipe(map((response: any) => {
                const userInfoToken = response.user_info_token;
                return new UserInfo(userInfoToken.id, userInfoToken.name, 
                    userInfoToken.email, userInfoToken.balance);
            })
        )
    }

    public getFilteredUserList$(){
        const httpHeaders = new HttpHeaders().set('Authorization', this.getTokenString());
        const body = {filter: " "};
        return this.http.post(`${environment.baseUrl}api/protected/users/list`, body,
        {headers: httpHeaders})
        .pipe(map((response: any) =>{
                return response.map((data: any) => {
                    return new UserInfo(data.id, data.name);
                });
            })
        )
    }

    public getTransations$(){
        const httpHeaders = new HttpHeaders().set('Authorization', this.getTokenString());
        return this.http.get(`${environment.baseUrl}api/protected/transactions`,
        {headers: httpHeaders})
        .pipe(map((response: any) =>{
                const transToken = response.trans_token;
                return transToken.map((data: any) => {
                    return new Transaction(data.id, data.date, data.username,
                        data.amount, data.balance);
                });
            })
        )
    }

    public createTransaction$(
        name: string,
        amount: number
    ){
        const model = new CreateTransactionModel(name, amount);
        const httpHeaders = new HttpHeaders().set('Authorization', this.getTokenString());
        return this.http.post(`${environment.baseUrl}api/protected/transactions`, model,
        {headers: httpHeaders})
        .pipe(tap(() => this.router.navigateByUrl("/")));
    }

    private getTokenString(){
        const token = this.storageService.getFromLocalStorage(StorageKeys.TOKEN);
        return `bearer ${token}`;
    }
}