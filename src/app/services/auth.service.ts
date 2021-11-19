import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthModel } from './auth.model';
import { environment } from 'src/environments/environment';
import { Paths } from '../paths';
import { StorageKeys } from './storage-keys';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private storageService: StorageService,
        private router: Router){ }
    
    private auth$ = new BehaviorSubject<boolean>(false);

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

    public getAuth$(){
        if (this.auth$.value === false){
            const token = this.storageService.getFromLocalStorage(StorageKeys.TOKEN);
            if (token != null){
                this.auth$.next(true); 
            }
        }
        return of(this.auth$.value);
    }

    public logout$(){
        this.storageService.clearLocalStorage();
        this.auth$.next(false);
        this.router.navigateByUrl(Paths.Auth);
    }

    private processTokenResponse(token: string){
        this.storageService.addToLocalStorage(StorageKeys.TOKEN, token);
        this.auth$.next(true);
        this.router.navigateByUrl("/")
    }
}