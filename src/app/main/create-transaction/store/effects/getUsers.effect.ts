import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { MainService } from "../../../services/main.service";
import {
  getUsersAction,
  getUsersFailureAction,
  getUsersSuccessAction,
} from "../actions/getUsers.action";
import { UserInterface } from "src/app/main/types/user.interface";

@Injectable()
export class GetUsersEffect {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsersAction),
      switchMap(() => {
        return this.mainService.getFilteredUserList().pipe(
          map((users: UserInterface[]) => {
            return getUsersSuccessAction({ users: users });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(getUsersFailureAction({ error: error.error }));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private mainService: MainService) {}
}
