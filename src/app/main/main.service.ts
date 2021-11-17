import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { StorageKeys } from '../services/storage-keys';
import { StorageService } from '../services/storage.service';
import { map } from 'rxjs';
import { UserInfo } from './user-info';

@Injectable()
export class MainService {
    
    constructor(
        private http: HttpClient,
        private storageService: StorageService){}

    public getUserInfo(){
        const token = this.storageService.getFromLocalStorage(StorageKeys.TOKEN);
        const httpHeaders = new HttpHeaders().set('Authorization', `bearer ${token}`);
        return this.http.get(`${environment.baseUrl}api/protected/user-info`,
        {headers: httpHeaders}).pipe(
            map((response: any) => {
                const userInfoToken = response.user_info_token;
                return new UserInfo(userInfoToken.id, userInfoToken.name, 
                    userInfoToken.email, userInfoToken.balance);
            })
        )
    }
}