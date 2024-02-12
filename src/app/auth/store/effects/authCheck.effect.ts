import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of } from "rxjs";

import { StorageService } from "src/app/services/storage.service";
import {
  authCheckAction,
  authCheckFailureAction,
  authCheckSuccessAction,
} from "../actions/authCheck.actions";
import { StorageKeys } from "src/app/services/storage-keys";

@Injectable()
export class AuthCheckEffect {
  authCheck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authCheckAction),
      map(() => {
        var isLoggedIn = false;
        const token = this.storageService.getFromLocalStorage(
          StorageKeys.TOKEN
        );
        if (token) {
          isLoggedIn = true;
        }
        return authCheckSuccessAction({ isLoggedIn: isLoggedIn });
      }),
      catchError(() => {
        return of(authCheckFailureAction({ error: "auth check failure" }));
      })
    )
  );

  constructor(
    private actions$: Actions,
    private storageService: StorageService
  ) {}
}
