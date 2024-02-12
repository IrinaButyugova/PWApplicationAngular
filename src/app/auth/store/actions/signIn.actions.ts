import { createAction, props } from "@ngrx/store";

import { ActionTypes } from "../actionTypes";
import { SignInRequestInterface } from "../../types/signInRequest.interface";

export const signInAction = createAction(
  ActionTypes.SIGN_IN,
  props<{ request: SignInRequestInterface }>()
);

export const signInSuccessAction = createAction(ActionTypes.SIGN_IN_SUCCESS);

export const signInFailureAction = createAction(
  ActionTypes.SIGN_IN_FAILURE,
  props<{ error: string }>()
);
