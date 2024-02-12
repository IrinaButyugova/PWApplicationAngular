import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import {
  signUpAction,
  signUpFailureAction,
  signUpSuccessAction,
} from "../actions/signUp.actions";
import { AuthService } from "src/app/auth/services/auth.service";
import { StorageService } from "src/app/services/storage.service";
import { StorageKeys } from "src/app/services/storage-keys";

@Injectable()
export class SignUpEffect {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpAction),
      switchMap(({ request }) => {
        return this.authService.signUp(request).pipe(
          map((token: string) => {
            this.storageService.addToLocalStorage(StorageKeys.TOKEN, token);
            return signUpSuccessAction();
          }),
          catchError((error: HttpErrorResponse) => {
            return of(signUpFailureAction({ error: error.error }));
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
