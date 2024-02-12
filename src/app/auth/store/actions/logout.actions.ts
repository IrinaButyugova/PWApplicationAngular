import { createAction, props } from "@ngrx/store";

import { ActionTypes } from "../actionTypes";

export const logoutAction = createAction(ActionTypes.LOGOUT);

export const logoutSuccessAction = createAction(ActionTypes.LOGOUT_SUCCESS);

export const logoutFailureAction = createAction(
  ActionTypes.LOGOUT_FAILURE,
  props<{ error: string }>()
);
