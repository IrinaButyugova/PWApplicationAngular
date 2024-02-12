import { createAction, props } from "@ngrx/store";

import { ActionTypes } from "../actionTypes";

export const authCheckAction = createAction(ActionTypes.AUTH_CHECK);

export const authCheckSuccessAction = createAction(
  ActionTypes.AUTH_CHECK_SUCCESS,
  props<{ isLoggedIn: boolean }>()
);

export const authCheckFailureAction = createAction(
  ActionTypes.AUTH_CHECK_FAILURE,
  props<{ error: string }>()
);
