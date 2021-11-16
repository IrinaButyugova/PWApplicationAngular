import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { AuthModel } from './auth.model';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../services/storage-keys';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private storageService: StorageService){ }

    public signUp$(
        username: string,
        email: string,
        password: string
    ){
        const authModel = new AuthModel(email, password, username);
       return this.http.post(`${environment.baseUrl}users`, authModel).pipe(
            tap((response: any) => this.processTokenResponse(response.id_token)
      ));
    }

    public signIn$(
        email: string,
        password: string
    ){
        const authModel = new AuthModel(email, password);
       return this.http.post(`${environment.baseUrl}sessions/create`, authModel).pipe(
            tap((response: any) => this.processTokenResponse(response.id_token)
      ));
    }

    private processTokenResponse(token: string){
        this.storageService.addToLocalStorage(StorageKeys.TOKEN, token);
    }
}