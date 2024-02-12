import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { MainService } from "../../services/main.service";
import {
  getTransactionsAction,
  getTransactionsFailureAction,
  getTransactionsSuccessAction,
} from "../actions/getTransactions.action";
import { TransactionInterface } from "../../types/transaction.iterface";

@Injectable()
export class GetTransactionsEffect {
  getTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTransactionsAction),
      switchMap(() => {
        return this.mainService.getTransations().pipe(
          map((transactions: TransactionInterface[]) => {
            return getTransactionsSuccessAction({ transactions: transactions });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(getTransactionsFailureAction({ error: error.error }));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private mainService: MainService) {}
}
