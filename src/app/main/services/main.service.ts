import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { CreateTransactionModel } from "../create-transaction.model";
import { environment } from "src/environments/environment";
import { StorageKeys } from "../../services/storage-keys";
import { StorageService } from "../../services/storage.service";
import { Observable, map, tap } from "rxjs";
import { TransactionInterface } from "../types/transaction.iterface";
import { CurrentUserInterface } from "../types/currentUser.interface";
import { CurrentUserResponseInterface } from "../types/currentUserResponse.interface";
import { TransactionsResponseInterface } from "../types/transactionsResponse.interface";

@Injectable()
export class MainService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {}

  public getCurrentUser(): Observable<CurrentUserInterface> {
    const httpHeaders = new HttpHeaders().set(
      "Authorization",
      this.getTokenString()
    );

    return this.http
    .get<CurrentUserResponseInterface>(
      `${environment.baseUrl}api/protected/user-info`,
      {
        headers: httpHeaders,
      }
    )
    .pipe(
      map((response: CurrentUserResponseInterface) => {
        return response.user_info_token;
      })
    );
  }

  public getFilteredUserList$() {
    const httpHeaders = new HttpHeaders().set(
      "Authorization",
      this.getTokenString()
    );
    const body = { filter: " " };
    return this.http
    .post(`${environment.baseUrl}api/protected/users/list`, body, {
      headers: httpHeaders,
    })
    .pipe(
      map((response: any) => {
        return response.map((data: any) => {
          return null; //new UserInfo(data.id, data.name);
        });
      })
    );
  }

  public getTransations(): Observable<TransactionInterface[]> {
    const httpHeaders = new HttpHeaders().set(
      "Authorization",
      this.getTokenString()
    );
    return this.http
    .get<TransactionsResponseInterface>(
      `${environment.baseUrl}api/protected/transactions`,
      {
        headers: httpHeaders,
      }
    )
    .pipe(
      map((response: TransactionsResponseInterface) => {
        return response.trans_token;
      })
    );
  }

  public createTransaction$(name: string, amount: number) {
    const model = new CreateTransactionModel(name, amount);
    const httpHeaders = new HttpHeaders().set(
      "Authorization",
      this.getTokenString()
    );
    return this.http
    .post(`${environment.baseUrl}api/protected/transactions`, model, {
      headers: httpHeaders,
    })
    .pipe(tap(() => this.router.navigateByUrl("/")));
  }

  private getTokenString() {
    const token = this.storageService.getFromLocalStorage(StorageKeys.TOKEN);
    return `bearer ${token}`;
  }
}
