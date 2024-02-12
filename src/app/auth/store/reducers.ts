import { createReducer, on, Action } from "@ngrx/store";

import { AuthStateInterface } from "../types/authState.interface";
import {
  signInAction,
  signInFailureAction,
  signInSuccessAction,
} from "./actions/signIn.actions";
import {
  signUpAction,
  signUpFailureAction,
  signUpSuccessAction,
} from "./actions/signUp.actions";
import { logoutAction, logoutSuccessAction } from "./actions/logout.actions";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoggedIn: false,
  error: null,
};

const authReducer = createReducer(
  initialState,
  on(
    signInAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      error: null,
    })
  ),
  on(
    signInSuccessAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
    })
  ),
  on(
    signInFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      error: action.error,
    })
  ),
  on(
    signUpAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      error: null,
    })
  ),
  on(
    signUpSuccessAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
    })
  ),
  on(
    signUpFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      error: action.error,
    })
  ),
  on(
    logoutAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      error: null,
    })
  ),
  on(
    logoutSuccessAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: false,
    })
  ),
  on(
    signUpFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      error: action.error,
    })
  )
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
