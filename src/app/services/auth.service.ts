import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";

import { AuthModel } from "./auth.model";
import { environment } from "src/environments/environment";
import { Paths } from "../paths";
import { StorageKeys } from "./storage-keys";
import { StorageService } from "./storage.service";
import { SignInRequestInterface } from "../types/signInRequest.interface";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { SignUpRequestInterface } from "../types/signUpRequest.interface";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private auth$ = new BehaviorSubject<boolean>(false);

  public signUp(data: SignUpRequestInterface): Observable<string> {
    return this.http
    .post<AuthResponseInterface>(`${environment.baseUrl}users`, data)
    .pipe(map(this.getToken));
  }

  public signIn(data: SignInRequestInterface): Observable<string> {
    return this.http
    .post<AuthResponseInterface>(`${environment.baseUrl}sessions/create`, data)
    .pipe(map(this.getToken));
  }

  getToken(response: AuthResponseInterface): string {
    return response.id_token;
  }

  public getAuth$() {
    if (this.auth$.value === false) {
      const token = null; //this.storageService.getFromLocalStorage(StorageKeys.TOKEN);
      if (token != null) {
        this.auth$.next(true);
      }
    }
    return of(this.auth$.value);
  }

  private processTokenResponse(token: string) {
    //this.storageService.addToLocalStorage(StorageKeys.TOKEN, token);
    this.auth$.next(true);
    this.router.navigateByUrl("/");
  }
}
