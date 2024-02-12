import { Action, createReducer, on } from "@ngrx/store";
import { MainStateInterface } from "../types/mainState.interface";
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from "./actions/getCurrentUser.action";

const initialState: MainStateInterface = {
  isLoading: false,
  currentUser: null,
  error: null,
};

const mainReducer = createReducer(
  initialState,
  on(
    getCurrentUserAction,
    (state): MainStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): MainStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state, action): MainStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  )
);

export function reducers(state: MainStateInterface, action: Action) {
  return mainReducer(state, action);
}
