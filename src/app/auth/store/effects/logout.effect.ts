import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, tap } from "rxjs";

import { StorageService } from "src/app/services/storage.service";
import {
  logoutAction,
  logoutFailureAction,
  logoutSuccessAction,
} from "../actions/logout.actions";

@Injectable()
export class LogoutEffect {
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAction),
      map(() => {
        this.storageService.clearLocalStorage();
        return logoutSuccessAction();
      }),
      catchError(() => {
        return of(logoutFailureAction({ error: "logout failure" }));
      })
    )
  );

  constructor(
    private actions$: Actions,
    private storageService: StorageService
  ) {}
}
