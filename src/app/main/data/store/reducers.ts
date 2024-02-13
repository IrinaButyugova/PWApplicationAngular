import { Action, createReducer, on } from "@ngrx/store";
import { DataStateInterface } from "../types/dataState.interface";
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from "./actions/getCurrentUser.action";
import {
  getTransactionsAction,
  getTransactionsFailureAction,
  getTransactionsSuccessAction,
} from "./actions/getTransactions.action";

const initialState: DataStateInterface = {
  isLoading: false,
  currentUser: null,
  transactions: null,
  error: null,
};

const dataReducer = createReducer(
  initialState,
  on(
    getCurrentUserAction,
    (state): DataStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): DataStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state, action): DataStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),
  on(
    getTransactionsAction,
    (state): DataStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getTransactionsSuccessAction,
    (state, action): DataStateInterface => ({
      ...state,
      isLoading: false,
      transactions: action.transactions,
    })
  ),
  on(
    getTransactionsFailureAction,
    (state, action): DataStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  )
);

export function reducers(state: DataStateInterface, action: Action) {
  return dataReducer(state, action);
}
