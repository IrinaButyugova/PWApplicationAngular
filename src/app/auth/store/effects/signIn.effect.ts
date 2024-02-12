import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import {
  signInAction,
  signInFailureAction,
  signInSuccessAction,
} from "../actions/signIn.actions";
import { AuthService } from "src/app/auth/services/auth.service";
import { StorageService } from "src/app/services/storage.service";
import { StorageKeys } from "src/app/services/storage-keys";

@Injectable()
export class SignInEffect {
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInAction),
      switchMap(({ request }) => {
        return this.authService.signIn(request).pipe(
          map((token: string) => {
            this.storageService.addToLocalStorage(StorageKeys.TOKEN, token);
            return signInSuccessAction();
          }),
          catchError((error: HttpErrorResponse) => {
            return of(signInFailureAction({ error: error.error }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private storageService: StorageService
  ) {}
}
