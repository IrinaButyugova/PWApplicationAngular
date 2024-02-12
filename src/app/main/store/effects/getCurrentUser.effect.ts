import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from "../actions/getCurrentUser.action";
import { MainService } from "../../services/main.service";
import { CurrentUserInterface } from "../../types/currentUser.interface";

@Injectable()
export class GetCurrentUserEffect {
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        return this.mainService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return getCurrentUserSuccessAction({ currentUser: currentUser });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(getCurrentUserFailureAction({ error: error.error }));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private mainService: MainService) {}
}
