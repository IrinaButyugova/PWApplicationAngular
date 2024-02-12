import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { SignInRequestInterface } from "../types/signInRequest.interface";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { SignUpRequestInterface } from "../types/signUpRequest.interface";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

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
}
