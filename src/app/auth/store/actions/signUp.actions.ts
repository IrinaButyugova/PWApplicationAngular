import { createAction, props } from "@ngrx/store";

import { ActionTypes } from "../actionTypes";
import { SignUpRequestInterface } from "../../types/signUpRequest.interface";

export const signUpAction = createAction(
  ActionTypes.SIGN_UP,
  props<{ request: SignUpRequestInterface }>()
);

export const signUpSuccessAction = createAction(ActionTypes.SIGN_UP_SUCCESS);

export const signUpFailureAction = createAction(
  ActionTypes.SIGN_UP_FAILURE,
  props<{ error: string }>()
);
